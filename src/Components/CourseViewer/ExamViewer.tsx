import {
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getExamQuestions } from "../../services/examService";
import axios from "axios";
import { getUserResult } from "../../Store/Apis/Results/getUserResult";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Store/store";

const ExamViewer = ({ examId }: { examId: number }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { result, loading, error } = useSelector((state: RootState) => state.results as {
    result: { data: { finalScore: number; totalScore: number; createdAt: string }[] };
    loading: boolean;
    error: string | null;
  });

  useEffect(() => {
    getExamQuestions(examId).then(setQuestions);
  }, [examId]);

  useEffect(() => {
    if (submitted) {
      dispatch(getUserResult({ examId }));
    }
  }, [submitted, examId, dispatch]);

  const handleChange = (questionId: number, field: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const submitQuestionResults = questions.map((q) => ({
      examQuestionId: q.id,
      trueOrFalseAnswer: answers[q.id]?.trueOrFalseAnswer ?? null,
      selectedOption: answers[q.id]?.selectedOption ?? null,
      writtenAnswer: answers[q.id]?.writtenAnswer ?? null,
    }));

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/results/submit`,
        { examId, submitQuestionResults },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit exam", error);
    }
  };

  if (submitted) {
    if (loading) {
      return (
        <div className="text-center mt-10">
          <CircularProgress />
          <Typography>جاري تحميل النتيجة...</Typography>
        </div>
      );
    }

    if (error) {
      return (
        <Typography className="text-center mt-6 text-red-600">
          {error}
        </Typography>
      );
    }

    return (
      <div className="text-center mt-10 space-y-4">
        <Typography variant="h5">✅ تم إرسال إجاباتك بنجاح</Typography>
        {result?.data?.length > 0 && (
          <>
            <Typography variant="h6">
              النتيجة: {result.data[0].finalScore} / {result.data[0].totalScore}
            </Typography>
            <Typography variant="body2">
              تم الإنتهاء في: {new Date(result.data[0].createdAt).toLocaleString("ar-EG")}
            </Typography>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {questions.map((q) => (
        <div className="p-4 border rounded-lg" key={q.id}>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              {q.question}
            </Typography>

            {q.type === "MULTIPLE_CHOICE" && (
              <RadioGroup
                value={answers[q.id]?.selectedOption ?? ""}
                onChange={(e) => handleChange(q.id, "selectedOption", parseInt(e.target.value))}
              >
                <FormControlLabel value={0} control={<Radio />} label={`A. ${q.optionA}`} />
                <FormControlLabel value={1} control={<Radio />} label={`B. ${q.optionB}`} />
                <FormControlLabel value={2} control={<Radio />} label={`C. ${q.optionC}`} />
                <FormControlLabel value={3} control={<Radio />} label={`D. ${q.optionD}`} />
              </RadioGroup>
            )}

            {q.type === "TRUE_FALSE" && (
              <RadioGroup
                value={answers[q.id]?.trueOrFalseAnswer ?? ""}
                onChange={(e) => handleChange(q.id, "trueOrFalseAnswer", e.target.value === "true")}
              >
                <FormControlLabel value="true" control={<Radio />} label="صح" />
                <FormControlLabel value="false" control={<Radio />} label="خطأ" />
              </RadioGroup>
            )}

            {q.type === "WRITTEN" && (
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="اكتب إجابتك هنا"
                value={answers[q.id]?.writtenAnswer ?? ""}
                onChange={(e) => handleChange(q.id, "writtenAnswer", e.target.value)}
              />
            )}
          </CardContent>
        </div>
      ))}

      <div className="text-center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          إرسال الإجابات
        </Button>
      </div>
    </div>
  );
};

export default ExamViewer;

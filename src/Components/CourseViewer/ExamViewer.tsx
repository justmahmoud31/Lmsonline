import { CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getExamQuestions } from "../../services/examService";
import axios from "axios";

const ExamViewer = ({ examId }: { examId: number }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getExamQuestions(examId).then(setQuestions);
  }, [examId]);

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
        {
          examId,
          submitQuestionResults,
        },
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
    return <Typography className="text-center mt-6">تم إرسال إجاباتك بنجاح ✅</Typography>;
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

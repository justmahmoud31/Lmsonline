# Project Documentation

## Project Overview
This project is designed to [briefly describe the purpose of the project, e.g., "manage user data," "process financial transactions," or "build a web application"]. It is structured to ensure modularity, scalability, and ease of maintenance.

## Folder Structure
```
.
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── Components
│   │   ├── Courses-Components
│   │   │   ├── Course-Card.tsx
│   │   │   └── Detailed-Course-Card.tsx
│   │   ├── Shared
│   │   │   ├── Footer.tsx
│   │   │   ├── Loading
│   │   │   │   ├── Loading.css
│   │   │   │   └── Loading.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PresetsFilter.tsx
│   │   │   ├── ProtectedRoutes.tsx
│   │   │   └── SidebarLayout.tsx
│   │   ├── Subjects-Comonents
│   │   │   └── Subjects-Card.tsx
│   │   └── Teachers-Components
│   │       └── Teacher-Card.tsx
│   ├── Modules
│   │   ├── Auth
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   ├── Checkout
│   │   │   └── checkout.tsx
│   │   ├── Courses
│   │   │   ├── Courses.tsx
│   │   │   └── OneCourse.tsx
│   │   ├── Home
│   │   │   ├── Home-Components
│   │   │   │   ├── Courses.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Offer.tsx
│   │   │   │   ├── Subjects.tsx
│   │   │   │   └── Teachers.tsx
│   │   │   └── Home.tsx
│   │   ├── Lesson
│   │   │   ├── Lesson-Components
│   │   │   │   ├── Lesson-SideBar.tsx
│   │   │   │   ├── LessonAccordion.tsx
│   │   │   │   └── LessonContent.tsx
│   │   │   └── WatchLesson.tsx
│   │   ├── NotFound
│   │   │   └── NotFound.tsx
│   │   ├── Profile
│   │   │   ├── Profile.tsx
│   │   │   └── UserCourses.tsx
│   │   ├── Subjects
│   │   │   └── Subjects.tsx
│   │   └── Teachers
│   │       └── TeachersPage.tsx
│   ├── Store
│   │   ├── Apis
│   │   │   ├── Auth
│   │   │   │   ├── Login
│   │   │   │   │   ├── LoginApi.tsx
│   │   │   │   │   └── LoginSlice.tsx
│   │   │   │   └── Signup
│   │   │   ├── Courses
│   │   │   │   ├── getCoursesApi.tsx
│   │   │   │   ├── getCoursesSlice.tsx
│   │   │   │   └── getOneCourseApi.tsx
│   │   │   ├── Lesson
│   │   │   │   ├── getLessonApi.tsx
│   │   │   │   └── getLessonSlice.tsx
│   │   │   ├── Material
│   │   │   │   ├── getMaterialApi.tsx
│   │   │   │   └── getMaterialSlice.tsx
│   │   │   ├── Persets
│   │   │   │   ├── getPersets.tsx
│   │   │   │   └── presetSlice.tsx
│   │   │   ├── Profile
│   │   │   │   └── GetProfile
│   │   │   │       ├── getProfileApi.tsx
│   │   │   │       └── getProfileSlice.tsx
│   │   │   └── Teachers
│   │   │       ├── getTeacherSlice.tsx
│   │   │       └── getTeachersApi.tsx
│   │   └── store.ts
│   ├── Theme
│   │   └── Theme.ts
│   ├── Types
│   │   ├── course.d.ts
│   │   ├── global.d.ts
│   │   ├── lesson.d.ts
│   │   ├── material.d.ts
│   │   ├── part.d.ts
│   │   ├── preset.d.ts
│   │   ├── teacher.d.ts
│   │   └── user.d.ts
│   ├── assets
│   │   ├── 404 Error Page not Found with people connecting a plug-rafiki.png:Zone.Identifier
│   │   ├── Books.png
│   │   ├── Books.png:Zone.Identifier
│   │   ├── Feeling sorry-pana.png
│   │   ├── Feeling sorry-pana.png:Zone.Identifier
│   │   ├── Group 9.png:Zone.Identifier
│   │   ├── Line 1.png:Zone.Identifier
│   │   ├── Line 2.png
│   │   ├── Line 2.png:Zone.Identifier
│   │   ├── Line.png
│   │   ├── TeahcerPic.png
│   │   ├── TeahcerPic.png:Zone.Identifier
│   │   ├── bro.png
│   │   ├── courses.png
│   │   ├── courses.png:Zone.Identifier
│   │   ├── exams.png
│   │   ├── exams.png:Zone.Identifier
│   │   ├── hero.png
│   │   ├── hero.png:Zone.Identifier
│   │   ├── logo.png
│   │   ├── logo.png:Zone.Identifier
│   │   ├── main-pic.png
│   │   ├── notfound.png
│   │   ├── registerpic.png
│   │   ├── subject.png
│   │   ├── subject.png:Zone.Identifier
│   │   ├── subject1.png
│   │   ├── subject1.png:Zone.Identifier
│   │   ├── subject2.png:Zone.Identifier
│   │   ├── subject3.png
│   │   ├── subject3.png:Zone.Identifier
│   │   ├── subjects1.png:Zone.Identifier
│   │   ├── subjects2.png
│   │   └── subjects2.png:Zone.Identifier
│   ├── index.css
│   ├── main.tsx
│   ├── utils
│   │   └── typeGuards.ts
│   └── vite-env.d.ts
├── structure.txt
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

36 directories, 107 files
```
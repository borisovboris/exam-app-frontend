export interface Subject {
    id: number,
    name?: string,
    description?: string,
    createdAt?: Date,
    creator: Teacher
}

export interface Teacher {
    id: number,
    username: string,
    email: string
}

export interface Student {
    id: number,
    username: string,
    email?: string,
    facultyNumber?: number,
}

export interface Topic {
    id: number,
    name: string, 
}

export interface QuestionType {
    id: number,
    type: string
}

export interface Question {
    id: number,
    title: string,
    maxPoints?: number,
    questionType: QuestionType,
    choices?: Array<Choice>
}

export interface Choice {
    id?: number,
    text?: string, 
    isCorrect?: boolean
}

export interface Exam {
    id: number,
    name: string, 
}

export interface Session {
    id: number,
    name: string, 
    startTime?: Date,
    endTime?: Date,
    teacher: Teacher,
    subject: Subject
}

export interface SessionQuestion {
    id: number,
    title: string,
    maxPoints: number,
    topicId: number,
    questionType: string
}

export interface SessionChoice {
    id: number,
    text: string, 
    isCorrect: boolean,
    questionId: number
}

export interface StudentExam {
    id: number,
    student: Student,
    session: Session,
    status?: string,
    totalEarnedPoints?: number,
    totalMaxPoints?: number,
    startTime?: Date,
    teacher?: Teacher,
    sessionName?: string,
    subjectName?: string
}

export interface Token {
    tokenId: string;
}
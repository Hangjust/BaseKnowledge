import { subjects } from "./seed-data";
import type { Subject, SubjectId } from "./types";

export function getSubjects(): Subject[] {
  return subjects;
}

export function getSubject(subjectId: SubjectId): Subject | undefined {
  return subjects.find((subject) => subject.id === subjectId);
}
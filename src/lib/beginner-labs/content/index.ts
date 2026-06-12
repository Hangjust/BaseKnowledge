import { findBeginnerLabTopic } from "../helpers";
import type { BeginnerLabSubjectId, BeginnerLabTopicContent } from "../types";
import { biologyBeginnerLabTopics } from "./biology";
import { chemistryBeginnerLabTopics } from "./chemistry";
import { computerScienceBeginnerLabTopics } from "./computer-science";
import { economicsBeginnerLabTopics } from "./economics";
import { englishBeginnerLabTopics } from "./english";
import { historyBeginnerLabTopics } from "./history";
import { mathBeginnerLabTopics } from "./math";
import { physicsBeginnerLabTopics } from "./physics";

export {
  biologyBeginnerLabTopics,
  chemistryBeginnerLabTopics,
  computerScienceBeginnerLabTopics,
  economicsBeginnerLabTopics,
  englishBeginnerLabTopics,
  historyBeginnerLabTopics,
  mathBeginnerLabTopics,
  physicsBeginnerLabTopics
};

export const beginnerLabTopics: readonly BeginnerLabTopicContent[] = [
  ...biologyBeginnerLabTopics,
  ...chemistryBeginnerLabTopics,
  ...computerScienceBeginnerLabTopics,
  ...economicsBeginnerLabTopics,
  ...englishBeginnerLabTopics,
  ...historyBeginnerLabTopics,
  ...mathBeginnerLabTopics,
  ...physicsBeginnerLabTopics
];

export function getAllBeginnerLabTopics(): readonly BeginnerLabTopicContent[] {
  return beginnerLabTopics;
}

export function getBeginnerLabTopicsBySubject(
  subjectId: BeginnerLabSubjectId
): BeginnerLabTopicContent[] {
  return beginnerLabTopics.filter((topic) => topic.meta.subjectId === subjectId);
}

export function getBeginnerLabTopic(
  subjectId: BeginnerLabSubjectId,
  slug: string
): BeginnerLabTopicContent | undefined {
  return findBeginnerLabTopic(beginnerLabTopics, subjectId, slug);
}

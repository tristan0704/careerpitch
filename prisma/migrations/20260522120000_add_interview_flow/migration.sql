CREATE TYPE "InterviewFlow" AS ENUM ('standard', 'apiMasterclass');

ALTER TABLE "Interview"
ADD COLUMN "interviewFlow" "InterviewFlow" NOT NULL DEFAULT 'standard';

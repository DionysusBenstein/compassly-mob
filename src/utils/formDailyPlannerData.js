export const formDailyPlannerData = (data, user, behavior, present) => {
  const formData = new FormData();

  formData.append('client_id', user.client_id);
  formData.append('focus', data.pointsOfFocus);
  formData.append('goals', data.goalsAndObjectives);
  formData.append('experiental', data.experientalActivity);
  formData.append('experiental_behavior', behavior.experientalBehavior);
  formData.append('social', data.socialSkills);
  formData.append('social_behavior', behavior.socialSkillsBehavior);
  formData.append('academic_present', present.academicActivity);
  formData.append('academic_header', data.academicActivityPeriod);
  formData.append('academic_description', data.academicActivityDescription);
  formData.append('cleaning_present', present.cleaningAssignment);
  formData.append('cleaning_description', data.cleaningAssignment);
  formData.append('session', data.sessionPersonal);
  formData.append('feeling_behavior', behavior.feelingBehavior);
  formData.append('reward_present', present.reward);
  formData.append('reward_description', data.reward);
  formData.append('behavior_review', data.behaviorReview);
  formData.append('closer_to_goal_header', data.closerOrFurtherGoals);
  formData.append('closer_to_goal_description', data.whyGoals);
  formData.append('notes', data.nameOfPlanner);

  return formData;
};

export const formatDailyPlannerBody = (data, user, behavior, present) => ({
  client_id: user.client_id,
  focus: data.pointsOfFocus,
  goals: data.goalsAndObjectives,
  experiental: data.experientalActivity,
  experiental_behavior: behavior.experientalBehavior,
  social: data.socialSkills,
  social_behavior: behavior.socialSkillsBehavior,
  academic_present: present.academicActivity,
  academic_header: data.academicActivityPeriod,
  academic_description: data.academicActivityDescription,
  cleaning_present: present.cleaningAssignment,
  cleaning_description: data.cleaningAssignment,
  session: data.sessionPersonal,
  reward_present: present.reward,
  reward_description: data.reward,
  behavior_review: data.behaviorReview,
  closer_to_goal_header: data.closerOrFurtherGoals,
  closer_to_goal_description: data.whyGoals,
  notes: data.nameOfPlanner,
  feeling: behavior.feelingBehavior,
});

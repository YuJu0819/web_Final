import useGame from "../../../sign/containers/hooks/useGame";
import useRoom from "./useRoom";
const useSkill = () => {
  const { user } = useGame();
  const { addScore } = useRoom();
  const skill_lhy = (my_score, other_score) => {
    addScore(other_score, my_score);
  };
  const skill_yu = () => {
    addScore(1, 0);
  };
  const skill_chris = (my_score, other_score) => {
    let tmp = (my_score - other_score) * 2;
    addScore(tmp, 0);
  };
  return {
    skill_chris,
    skill_lhy,
    skill_yu,
  };
};

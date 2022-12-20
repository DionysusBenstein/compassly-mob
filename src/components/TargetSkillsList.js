import React, { useState } from 'react';
import { connect } from 'react-redux';

import authOperations from '../redux/auth/authOperations';
import authSelectors from '../redux/auth/authSelectors';
import dcmOperations from '../redux/dcm/dcmOperations';
import TargetSkill from './TargetSkill/TargetSkill';

function TargetSkillsList({
  targetSkills,
  themes,
  client_id,
  client_name,
  setDcm,
  setRunning,
  running,
  clearRunning,
  setError,
  clearError,
  setBehavior,
  globalBehavior,
  navigation,
  isUserNew,
  theme,
  subDomainOpened,
}) {
  // console.log("dcm", getDcm);
  const [openedSkill, setOpenedSkill] = useState(null);

  const openSkill = (i) => {
    setOpenedSkill(i);
    console.log('iUNN', isUserNew);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {targetSkills.map((skill, i) => (
        <TargetSkill
          key={skill.id + i}
          themes={themes}
          skill={skill}
          index={i}
          openSkill={openSkill}
          opened={openedSkill === i}
          client_id={client_id}
          client_name={client_name}
          getDcm={setDcm}
          openModal={openModal}
          setRunning={setRunning}
          running={running}
          clearRunning={clearRunning}
          setError={setError}
          clearError={clearError}
          setBehavior={setBehavior}
          globalBehavior={globalBehavior}
          navigation={navigation}
          theme={theme}
          isUserNew={isUserNew}
          subDomainOpened={subDomainOpened}
        />
      ))}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    dcm: state.dcm.opened,
    running: state.dcm.running,
    globalBehavior: state.dcm.behavior,
    error: state.auth.error,
    theme: authSelectors.getTheme(state),
    isUserNew: state.auth.isUserNew,
  };
};

export default connect(mapStateToProps, {
  setDcm: dcmOperations.getDcm,
  setRunning: dcmOperations.setRunning,
  clearOpened: dcmOperations.clearOpened,
  clearRunning: dcmOperations.clearRunning,
  setError: authOperations.setError,
  clearError: authOperations.clearError,
  setBehavior: dcmOperations.setBehavior,
})(TargetSkillsList);

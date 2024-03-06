import { createContext, useContext, useState } from 'react';

const CompetitionContext = createContext();

export const CompetitionProvider = ({ children }) => {
  const [sliderBgClass, setSliderBgClass] = useState('');
  const [scoreBgClass, setScoreBgClass] = useState('');
  const [logo, setLogoSrc] = useState('');

  const updatesliderClass = (newClass) => {
    setSliderBgClass(newClass);
  };
  const updatescoreBgClass = (newClass) => {
    setScoreBgClass(newClass);
  };
  const updateLogoSrc = (src) => {
    setLogoSrc(src);
  };

  const contextValues = {
    sliderBgClass,
    scoreBgClass,
    logo,
  };

  const contextFunctions = {
    updatesliderClass,
    updatescoreBgClass,
    updateLogoSrc
  }
  return (
    <CompetitionContext.Provider value={{contextValues,contextFunctions}}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  return useContext(CompetitionContext);
};

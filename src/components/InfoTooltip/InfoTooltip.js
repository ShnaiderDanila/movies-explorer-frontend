import { React } from 'react';

import './InfoTooltip.css';

import iconSuccess from '../../images/icon-success.svg';

function InfoTooltip({ setIsInfoTooltipOpen, isInfoTooltipOpen, infoTooltipTitle }) {

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className={`info-tooltip ${isInfoTooltipOpen ? 'info-tooltip_is-opened' : ''}`}>
      <div className="info-tooltip__container">
        <img
          className="info-tooltip__image"
          src={iconSuccess}
          alt='Информационная всплывающая подсказка' />
        <h3 className="info-tooltip__title">
          {infoTooltipTitle}
        </h3>
        <button onClick={closeInfoTooltip} className="info-tooltip__button-close" type="button" />
      </div>
    </div>
  )
}

export default InfoTooltip
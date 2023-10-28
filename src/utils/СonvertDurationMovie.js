function convertDurationMovie(duration) {
  const minutes = duration % 60;
  const hours = Math.floor(duration / 60);

  if (hours === 0) {
    return `${minutes > 0 ? `${minutes}м` : ''}`;
  }

  return `${hours}ч ${minutes > 0 ? `${minutes}м` : ''}`;
}

export default convertDurationMovie
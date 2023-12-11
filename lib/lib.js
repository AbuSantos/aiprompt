function capitalizeFirstLetter(string) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  function capitalizeFirstPost(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
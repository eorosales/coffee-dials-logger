export const capitalize = (str) => {
  const words = str.split(" ");
  for (let w = 0; w < words.length; w++) {
    words[w] =
      words[w].charAt(0).toUpperCase() + words[w].slice(1).toLowerCase();
  }
  return words.join(" ");
};

// const nsToTime = (ns) => {
//   var seconds = parseInt((ns / 1000) % 60),
//     minutes = parseInt((ns / (1000 * 60)) % 60),
//     hours = parseInt((ns / (1000 * 60 * 60)) % 24);

//   hours = hours < 10 ? "0" + hours : hours;
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;

//   return hours + ":" + minutes + ":" + seconds;
// };

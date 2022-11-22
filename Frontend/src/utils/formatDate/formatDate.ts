export const formatDate = (dateIsoString: string) => {
  if (!dateIsoString)
    return {
      dateString: "",
      formattedTime: "",
      formattedDate: "",
    };

  const splitOnT = dateIsoString?.split("T");
  const date = splitOnT[0];
  const time = splitOnT[1];

  const brokenDate = date?.split("-");
  const brokenTime = time?.split(":");

  const formattedTime = `${brokenTime[0]}:${brokenTime[1]}`;
  const formattedDate = `${brokenDate[2]}/${brokenDate[1]}/${brokenDate[0]}`;

  const formattedDateTime = formattedTime + " - " + formattedDate;
  return formattedDateTime;
};

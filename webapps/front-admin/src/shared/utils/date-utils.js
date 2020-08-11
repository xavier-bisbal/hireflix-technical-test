export const getStringDateFromUnix = (unixTimeStamp) => {
    return (new Date(unixTimeStamp).toLocaleDateString());
};

const dateFormat = (time) => {
    const tweet_Date = new Date(time);

    const formattedDate = tweet_Date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = tweet_Date.toLocaleTimeString("en-US")

    return { formattedDate, formattedTime }
}

export default dateFormat


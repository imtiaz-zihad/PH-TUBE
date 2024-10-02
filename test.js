function getTime(time){
    const hour = parseInt(time /3600);
    let remainingSecond = time % 3600;
    let minute = parseInt(remainingSecond / 60);
    remainingSecond =parseInt(remainingSecond%60)
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
    
}
console.log(getTime(4326));

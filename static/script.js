const heart = document.querySelector("img");
if (localStorage.getItem("hasGrade"))
{
    heart.src = "heart.png";
    document.querySelector("p").innerHTML = "Спасибо!";
}
else
    heart.src = "emptyHeart.png"; 

let countGrades;
async function getGrades()
{
    let countGradesAnswer = await fetch("https://gradepage.vercel.app/api/getGrades", {
        method: "GET"
    });
    countGrades = await countGradesAnswer.text();
    updateTextGrades();
}
getGrades();

function updateTextGrades()
{ 
    document.querySelectorAll("p")[1].innerHTML = `Оценку поставил${
    countGrades % 100 != 1 && countGrades % 10 == 1 ? "" : "и"} ${countGrades} человек${
    countGrades % 100 != 1 && [2, 3, 4].includes(countGrades % 10) ? "а" : ""}`;
}

async function delay(time)
{
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);       
    });
}

heart.style.width = heart.width + "px";
heart.style.height = heart.height + "px";
let isOn = false;
heart.onclick = async () => 
{
    if (isOn)
        return;

    isOn = true;
    const limitTop = heart.width;
    const limitDown = heart.width * 0.85;
    while (heart.width > limitDown)
    {
        heart.style.width = heart.width - 5 + "px";
        heart.style.height = heart.height - 5 + "px";
        await delay(5);
    }
    while (heart.width < limitTop)
    {
        heart.style.width = heart.width + 5 + "px";
        heart.style.height = heart.height + 5 + "px";
        await delay(5);
    }

    isOn = false;

    if (heart.src.includes("emptyHeart.png"))
    {
        countGrades ++;
        updateTextGrades();
        heart.src = "heart.png";
        document.querySelector("p").innerHTML = "Спасибо!";
        localStorage.setItem("hasGrade", true);
        await fetch("https://gradepage.vercel.app/api/newGrade", {
            method: "POST"
        });       
    }  
};

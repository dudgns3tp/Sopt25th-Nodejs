

function getScoreArray(size){
    return new Promise(function (resolve,reject){
        if(size <=0){
            reject(new Error("size must be postive"));
            return;
        }

        const arr = [...Array(size)].map(idx =>parseInt(Math.random() * 11)-10); // 랜덤한값 넣어줌
            console.log(`array is ${arr}`);
            resolve(arr);
        
    });
}

function getSum(arr){
    return new Promise(function (resolve, reject){
        const sum = arr.reduce((prev, current)=> prev + current);  
        if(sum <=0){
            reject(new Error("sum must be larger than 0"));
            return;
        }
        console.log(`sum: ${sum}`);
        resolve(sum);
    });
}

function getGrade(result) {
    return new Promise(function (resolve, reject) {    
        let grade;
        switch(parseInt(result / 10)){
            case 9:
            case 8:
                grade = 'A'; break;
            case 7:
                grade = 'B'; break;
            case 6:
                grade = 'C'; break;
            case 5:
                grade = 'D'; break;
            default:
                reject(new Error(`too low score(${result})`));
                return;
        }
        resolve(grade);
    });
}

getScoreArray(10)
.catch(err=>{
    console.log(`Error:${err}`);
    return [...Array(5)].fill(10); // 5개의 더미값을 가진 배열 생성후 10을 채워주고 그다음 getsum을 처리
})
.then(getSum) // 여기서 error가 발생하면 바로 아래있는 catch로 넘어감 resolve시에 그다음 으로 넘어감
.then(getGrade)
.then((result) => console.log(`grade is ${result}`))
.catch(err =>{
    console.log(`error3: ${err}`);
})
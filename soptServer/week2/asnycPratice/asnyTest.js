function task1(){
    setTimeout(function(){
        console.log('task1');
    },0); // 파라미터 (어떤 명령이 실행될 스크립트, 몇초 뒤에 실행될것);
}
    function task2(){
        console.log('task2');
    }

    function task3(){
        console.log('task3');
    }

    task1();
    task2();
    task3();

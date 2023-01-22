window.onload = function () {
    // 녹화 관련 변수 생성.
    let parts = [];
    let mediaRecorder; 
    let url;

    // 웹캠 화면 출력 및 녹화 시작
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
        document.getElementById("record_video").srcObject = stream;
        document.getElementById("record").onclick = function () {
            mediaRecorder = new MediaRecorder(stream);
            parts = []; // 프레임 저장 Array
            mediaRecorder.start(0);
            mediaRecorder.ondataavailable = function (e) {
                parts.push(e.data); // 프레임 저장
            }
        }
    });

    // 녹화 중지
    document.getElementById("stop").onclick = function () {
        mediaRecorder.stop(0);
        const blob = new Blob(parts, {
            type: "video/webm"
        });
        url = URL.createObjectURL(blob);
    }


    // 녹화영상 재생
    document.getElementById("play").onclick = function () {
        // 영상 재생용 태그에 지정된 소스 초기화
        document.getElementById("replay_video").srcObject = null;
        document.getElementById("replay_video").src = url;
        // 재생, 일시정지와 같은 영상 컨트롤 허용
        document.getElementById("replay_video").controls = true;
        document.getElementById("replay_video").play();
    }


    // 녹화영상 다운로드
    document.getElementById("download").onclick = function () {
        // 다운로드에 사용할 <a> 태그 생성
        const videooo = document.createElement("a");
        // 페이지에 태그 적용하고, href에 생성한 URL 지정
        document.body.appendChild(videooo);
        videooo.href = url;
        // 다운로드
        videooo.download = "interview_video.webm";
        videooo.click();
    }
}
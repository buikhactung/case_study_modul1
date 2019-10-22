let cout = 0;
let temp = [];
let checkWin = [];
let starttime;
let PlayWin = [ ];
let endtime;
let timeWin;
let nameplay=document.getElementById("nameplay");
function ShowImage(number, colrow) {
    starttime = new Date();
    this.colrow = colrow;
    this.number = number;
    this.arrImg = [];
    this.addImg = function () {
        for (let i = 1; i <= this.number; i++) {
            this.arrImg.push(i, i);
        }
        return this.arrImg;
    };
    //Phương thức random ảnh;
    this.randomArr = function () {
        for (let k = this.arrImg.length -1; k > 0; k--) {
            let h = Math.floor(Math.random() * (k+ 1));
            let temp = this.arrImg[k];
            this.arrImg[k] = this.arrImg[h];
            this.arrImg[h] = temp;
        }
        return this.arrImg;
    };
    this.drawImage = function () {
        this.randomArr();
        let table = "<table>";
        for (let i = 0; i < this.colrow; i++) {
            table += "<tr>";
            for (let j = 0; j < this.colrow; j++) {
                let nameImg = this.arrImg [(this.colrow * i) + j];
                //alert(nameImg);
                table += "<td><img src='image0.png' onclick='Click(this,this.name)' name = ' " + nameImg + "'></td>";
            }
            table += "</tr><table>";
            let drawtable = document.getElementById("table");
            drawtable.innerHTML = table;
        }
    }
}
function Click(img, name) {
    cout++; // số lần click 1 ảnh
    this.name = name;
    if (cout <= 2) {
        img.src = "http://localhost:63342/casestudy/image" + this.name.trim() + ".png";
        img.setAttribute("onclick", "");
        temp.push(img);
        if (cout === 2) {
            setTimeout(Check, 700, temp[0], temp[1])
        }
    }
}
function Check(item1, item2) {
    if (item1.name !== item2.name) {
        item1.src = "image0.png";
        item1.setAttribute("onclick", "Click(this,this.name)");

        item2.src = "image0.png";
        item2.setAttribute("onclick", "Click(this,this.name)");
    } else {
        checkWin.push(1, 1);
        let coutCheckWin = checkWin.length;
        if (coutCheckWin >= 16) {
            endtime = new Date();
            timeWin = endtime - starttime;
            let whoPlay = prompt("You win with: " + timeWin + "minisecond. Insert your name")
            PlayWin.unshift(whoPlay, timeWin);
            //khởi tạo lại game
            let Board = new ShowImage(8, 4);
            Board.addImg();
            Board.drawImage();
            checkWin = [];
            // coutCheckWin
            nameplay.innerHTML = " ";
            LeaderBoard();
        }
    }
    cout = 0;
    temp = [];
}

function LeaderBoard() {
    for (let i = 0; i < PlayWin.length; i++) {
        nameplay.innerHTML = nameplay.innerHTML + "<span class = 'Board'>" + PlayWin[i] + " " +"</span>" +"</br>";
    }
}

// function BoardReset() {
//     let Board = new ShowImage(8, 4);
//     Board.addImg();
//     Board.drawImage();
//     coutCheckWin = [];
// }

LeaderBoard();
let Board = new ShowImage(8, 4);
Board.addImg();
Board.drawImage();
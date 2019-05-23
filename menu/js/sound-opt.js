function sound_opt(){
    var som_opt = new Audio();
    som_opt.src = './sound/UI_Quirky30.mp3';
    som_opt.volume = 0.2;
    som_opt.load();
    som_opt.play();
}

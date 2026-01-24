function splitAnyPitches(pitches) {
    let sapc = `copy # #\$
convert #\$ audio/wav\n`
    const tempcopy = [];
    const temppitch = [];
    const tempapm = [];
    for(let i = 0; i < pitches; i++) {
        tempcopy.push(`copy #$ #$${i}`);
        temppitch.push(`audiopitch #$${i} 2**({arg:${i+1}}/12)`);
        tempapm.push(`audioputmix #$0 #$${i}
volume #$0`);
    }
    tempapm.shift();
    sapc += tempcopy.join("\n") + "\n" + temppitch.join("\n") + "\n" + tempapm.join("\n") + `\nclone #$0 #$\nrepeatduration #$ #d
audioputreplace # #$`;
    return {
        "args": pitches,
        "params": new Array(pitches).fill(0).map((x,i) => "{" + "arg:"+(i+1)+"}"),
        "code": sapc
    }
}

function multiGradientMap(colors) {
    let mgm = `grayscale #`
    const tempcr = [];
    const tempcg = [];
    const tempcb = [];
    for(let i = 1; i <= colors/3; i++) {
        tempcr.push("{"+`arg:${i*3-2}}/255`);
        tempcg.push("{"+`arg:${i*3-1}}/255`);
        tempcb.push("{"+`arg:${i*3}}/255`);
    }
    mgm += "\nhuecurvergba # red " + tempcr.join(" ") + "\nhuecurvergba # green " + tempcg.join(" ") + "\nhuecurvergba # blue " + tempcb.join(" ");
    
    return {
        "args": Math.round(colors/3)*3,
        "params": new Array(Math.round(colors/3)*3).fill(0).map((x,i) => "{" + "arg:"+(i+1)+"}"),
        "code": mgm
    }
}

module.exports = { splitAnyPitches, multiGradientMap }
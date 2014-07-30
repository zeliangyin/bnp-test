var fs = require('fs')

function search(dataBuffer){
    // fs.readFile(dataBuffer, function (err, data) {
    //if (err) throw err

        var mat = [],
            num,
            count

            mat = dataBuffer.toString().match(/[^\r\n]+/g)
            num = mat[0]
            mat = mat.slice(1, mat.length - 1)

        // console.log(num)
        // console.log(mat)
        // console.log()

        // count = maxSizePosition(mat, 'o')
        // console.log(count)
        // console.log(showSquare(count, mat).join('\n'))

    // })
    
    // showSquare use position and size to draw the largest square
    return showSquare(
               // maxSizePostion return the size and postion for the largest square
               maxSizePosition(mat, 'o'), mat
           ).join('\n')
}

function showSquare(inf, mat){
    var length = inf['length'],
        x = inf['x'],
        y = inf['y']

    for(var i = x; i < x + length; i++) {
        mat[i] = mat[i].substr(0, y) + Array(length+1).join('x') + mat[i].substr(y + length, mat[i].length)
    }

    return mat
}

function maxSizePosition(mat , symbole){
// function maxSizePosition(mat , symbole){

    var nRow = mat.length,
        nCol = mat[0].length,
        count = [],
        min = 1,
        result 

    if(!( nRow && nCol )) return 0 
    for (var i = 0; i < nRow; i++){
        count.push(Array.apply(null, new Array(nCol)).map(Number.prototype.valueOf,0))
    }

    for (var i = 0; i < nRow; i++){
        for(var j = 0; j < nCol; j++){
           if(mat[i][j] != symbole){
                if(i > 0 && j > 0){
                    count[i][j] = 1 + Math.min( count[i][j-1],
                                                count[i-1][j],
                                                count[i-1][j-1])
                    if(count[i][j] > min){
                        min = count[i][j]
                        result = {'length':min, 'x':i + 1 - min, 'y':j + 1 - min}
                    }
                } else { 
                    count[i][j] = 1
                }
                 
           } 
        } 
    }

    return result
}

exports.search = search;
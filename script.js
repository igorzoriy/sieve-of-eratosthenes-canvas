/**
 * @param {Number} max
 * @returns {Array}
 */
function sequence(max) {
    var D = [], primes = [];
    for (var q = 2; q < max; q++) {
        if (D[q]) {
            for (var i = 0; i < D[q].length; i++) {
                var p = D[q][i];
                if (D[p + q]) {
                    D[p + q].push(p);
                } else {
                    D[p + q] = [p];
                }
            }
            delete D[q];
        } else {
            primes[q] =q;
            if (q * q < max) {
                D[q * q] = [q];
            }
        }
    }
    return primes;
}

/**
 * @param {Number} x
 * @param {Number} y
 * @constructor
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * @param {String} canvasId
 * @param {Number} sellSize in pixels
 * @param {Number} sellCount
 * @constructor
 */
function SoE(canvasId, sellSize, sellCount) {
    this.sellSize = sellSize;
    this.sellCount = sellCount;
    this.rowCount = this.columnCount = Math.ceil(Math.sqrt(this.sellCount));

    this.canvas = document.getElementById(canvasId);
    this.canvas.width = sellSize * this.columnCount;
    this.canvas.height = sellSize * this.rowCount;

    this.context = canvas.getContext('2d');
    this.context.font = Math.round(sellSize / 2) + 'px sans-serif';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
}

/**
 * @private
 * @param {Point} start
 * @param {Point} end
 */
SoE.prototype.drawLine = function (start, end) {
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.closePath();
    this.context.stroke();
};

/**
 * @param {Point} start
 * @param {Point} end
 */
SoE.prototype.drawCross = function (start, end) {
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.moveTo(end.x, start.y);
    this.context.lineTo(start.x, end.y);
    this.context.closePath();
    this.context.stroke();
};

/**
 * @private
 */
SoE.prototype.drawSieve = function () {
    var i;
    for (i = 0; i < this.rowCount; i++) {
        this.drawLine(new Point(0, i * this.sellSize - 1), new Point(this.canvas.width - 2, i * this.sellSize - 1));
    }
    for (i = 0; i < this.columnCount; i++) {
        this.drawLine(new Point(i * this.sellSize - 1, 0), new Point(i * this.sellSize - 1, canvas.height - 2));
    }
};

SoE.prototype.drawText = function (text, x, y) {
    this.context.fillText(text, x, y);
};

/**
 * draw numbers and cross composite numbers
 * @private
 */
SoE.prototype.drawNumbers = function () {
    var x, y, i;
    var list = sequence(this.sellCount);
    for (i = 1; i <= this.sellCount; i++) {
        x = this.sellSize * ((i - 1) % this.columnCount);
        y = this.sellSize * (Math.ceil(i / this.columnCount) - 1);

        if (!list[i]) {
            var padding = 4;
            this.drawCross(new Point(x + padding, y + padding), new Point(x + this.sellSize - padding, y + this.sellSize - padding));
        }

        x += this.sellSize / 2;
        y += this.sellSize / 2;
        this.drawText(i, x, y);
    }
};

/**
 * @public
 */
SoE.prototype.render = function () {
    this.drawSieve();
    this.drawNumbers();
};

var sieve = new SoE('canvas', 30, 100);
sieve.render();
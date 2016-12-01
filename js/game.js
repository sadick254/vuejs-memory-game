function generateNumber(digits) {
  var min = Math.pow(10, digits - 1)
  var max = Math.pow(10, digits)
  var num = Math.floor(Math.random() * (max - min + 1)) + min
  return num;
}

function hideNumber() {
  var el = document.getElementById('number')
  el.innerHTML = el.innerHTML.replace(/\w/gi, '&#183;');
}
function showNumber(number) {
  var el = document.getElementById('number')
  el.innerHTML = number
}
new Vue({
  el: "#app",
  data: {
    randomNum: 0,
    level: 1,
    sublevel: 0,
    number: '',
    errorCount: 0,
    gameEnd: false,
    wrongFeedback: false
  },
  mounted: function () {
    this.randomNum = generateNumber(this.level)
  },
  methods: {
    nextNumber: function () {
      if (this.number === this.randomNum) {
        this.wrongFeedback = false
        if (this.sublevel === this.level) {
          this.level++
          this.sublevel = -1
        }
        this.sublevel++
        this.number = ''
        this.randomNum = generateNumber(this.level)
        var time = this.level * 160
        setTimeout(hideNumber, time)
      } else {
        this.wrongFeedback = true
        this.errorCount++
        showNumber(this.randomNum)
        if (this.errorCount == 3) {
          this.gameEnd = true
        }
      }
    },
    start: function () {
      hideNumber()
    },
    restartGame: function(){
      this.level = 1
      this.sublevel = 0
      this.gameEnd = false
      this.wrongFeedback = false
      this.errorCount = 0
      this.number = ''
      this.randomNum = generateNumber(this.level)
    }
  }
})


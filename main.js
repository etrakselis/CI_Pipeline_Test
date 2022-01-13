const about = document.querySelector('#about')
const contact = document.querySelector('#contact')
const aboutContent = document.querySelector('#about-content')
const contactContent = document.querySelector('#contact-content')

about.addEventListener('click', () => {
  const aboutBox = new WinBox({
    title: 'Deployment Info',
    // modal: true,
    width: '375px',
    height: '550px',
    top: 50,
    right: 0,
    bottom: 100,
    left: 0,
    mount: aboutContent,
    onfocus: function () {
      this.setBackground('#00aa00')
    },
    onblur: function () {
      this.setBackground('#777')
    },
  })
})

var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
  loop: false,
  delay: 75,
  autoStart: true,
  cursor: '|',
  strings: ['sudo apt-get update']
});

typewriter
  .deleteAll(1)
  .pauseFor(50)
  
  .deleteAll(1)
  .typeString('sudo apt-get install')
  .pauseFor(50)
  
  .deleteAll(1)
  .typeString('...')
  .deleteAll(1)
  .pauseFor(1000)
const Editor = (function () {
  return {
    initializeEditor() {
      this.initializeToolbar();
      this.makeIframeEditable();

      // convert user input to HTML in iframe
      $getID('textEditor').addEventListener('input', () => {
        const htmlCode = $getID('textEditor').value;
        parsedHtml.document.body.innerHTML = htmlCode;
        $getC('js-plain_text').value = parsedHtml.document.body.innerText;
      });
      // update code on editing view
      parsedHtml.document.body.addEventListener('input', function () {
        $getID('textEditor').value = this.innerHTML;
        $getC('js-plain_text').value = this.innerText;
      });

    },

    makeIframeEditable() {
      // make the iframe editable
      parsedHtml.document.designMode = 'on';
      // add bootstrap to iframe
      parsedHtml.document.head.innerHTML += `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">`;
      // custom css for mobile view of iframe
			parsedHtml.document.head.innerHTML += `<style>
																					body {
																						padding: 5px 10px;
																					}
                                         .mobile_view {
                                           width: 375px;
                                           height: 667px;
                                           border: 1px solid #ddd;
                                           border-radius: 25px;
                                           margin: 30px auto;
                                           position: relative;
                                         }
                                         .mobile_view:before {
                                           content: '';
                                           position: absolute;
                                           width: 385px;
                                           border: 1px solid #ddd;
                                           height: 687px;
                                           border-radius: 25px;
                                           left: -5px;
                                           top: -10px;
                                         }
                                         .mobile_view:after {
                                           content: '';
                                           position: absolute;
                                           width: 35px;
                                           height: 4px;
                                           border: 1px solid #ddd;
                                           left: 169px;
                                           border-radius: 25px;
                                           top: -7px;
                                         }
                                        </style>`;
    },

    initializeToolbar() {
      $getC('btn-toolbar', true, 'multiple').forEach(button => {
        button.addEventListener('click', () => {
          const feature = button.dataset.feature;

          if (feature === 'createLink') {
            const link = prompt("Enter the link");
            this.executeCommand(feature, false, link)
          } else if (feature === 'fontSize') {
            const fontSize = prompt("Enter font size (em)");
            this.executeCommand(feature, true, fontSize);
          } else if (feature === 'formatBlock') {
            const headingType = button.dataset.value;
            this.executeCommand(feature, true, headingType);
          } else if (feature === 'insertImage') {
            const source = prompt("Enter the image source");
            this.executeCommand(feature, false, source)
          } else {
            button.classList.toggle('active');
            this.executeCommand(feature, false, null)
          }

        });
      });

      $getID('fontColor').addEventListener('change', () => {
        this.executeCommand('foreColor', false, $getID('fontColor').value)
      });

      $getC('btn-mobile_view').addEventListener('click', () => {
        parsedHtml.document.body.classList.toggle('mobile_view')
      });

    },

    executeCommand(command, showDefaultUI, value) {
      parsedHtml.document.execCommand(command, showDefaultUI, value);
    }

  }
})();

Editor.initializeEditor();
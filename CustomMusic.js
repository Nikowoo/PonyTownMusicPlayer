    var currentAudio = null;

    function stopAllAudio() {
        var audioElements = document.getElementsByTagName('audio');
        for (var i = 0; i < audioElements.length; i++) {
            audioElements[i].pause();
            audioElements[i].parentNode.removeChild(audioElements[i]);
        }
        currentAudio = null;
    }

    function playAudio(url, loop, volume) {
        if (currentAudio) {
            alert("The current song hasn't finished playing yet!");
            return;
        }
        var audio = new Audio(url);
        audio.loop = loop;
        audio.volume = volume;
        audio.addEventListener('ended', function() {
            currentAudio = null;
        });
        document.body.appendChild(audio);
        audio.play();
        currentAudio = audio;
    }

    function openModal() {
        var modalHtml = `
            <div id="pt-custom-music-modal" style="display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.5);">
                <div style="background-color: #fefefe; color: black; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 50%;">
                    <h2>Custom Music Settings</h2>
                    <p>Made by @NikoArtzx on Twitter<p>
                    <label for="audioUrl">Audio URL:</label>
                    <input type="text" id="audioUrl" style="width: 100%; margin-bottom: 10px;">
                    <label for="loopCheckbox">Loop:</label>
                    <input type="checkbox" id="loopCheckbox" style="margin-bottom: 10px;">
                    <br>
                    <label for="volumeRange">Volume:</label>
                    <input type="range" id="volumeRange" min="0" max="1" step="0.05" value="1" style="width: 100%; margin-bottom: 20px;">
                    <br>
                    <label for="playbackRateRange">Playback Rate:</label>
                    <input type="range" id="playbackRateRange" min="0.5" max="2" step="0.05" value="1" style="width: 100%; margin-bottom: 20px;">
                    <br>
                    <button id="playButton">Play</button>
                    <button id="stopButton">Stop</button>
                    <button id="cancelButton">Cancel</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        var modal = document.getElementById('pt-custom-music-modal');
        var audioUrlInput = document.getElementById('audioUrl');
        var loopCheckbox = document.getElementById('loopCheckbox');
        var volumeRange = document.getElementById('volumeRange');
        var playbackRateRange = document.getElementById('playbackRateRange');
        var playButton = document.getElementById('playButton');
        var stopButton = document.getElementById('stopButton');
        var cancelButton = document.getElementById('cancelButton');

        playButton.addEventListener('click', function() {
            var url = audioUrlInput.value.trim();
            var loop = loopCheckbox.checked;
            var volume = parseFloat(volumeRange.value);
            var playbackRate = parseFloat(playbackRateRange.value);
            if (!url) {
                alert("Please enter a valid audio URL.");
                return;
            }
            playAudio(url, loop, volume, playbackRate);
            closeModal();
        });

        stopButton.addEventListener('click', function() {
            stopAllAudio();
            closeModal();
        });

        cancelButton.addEventListener('click', function() {
            closeModal();
        });

        volumeRange.addEventListener('input', function() {
            if (currentAudio) {
                currentAudio.volume = parseFloat(volumeRange.value);
            }
        });

        playbackRateRange.addEventListener('input', function() {
            if (currentAudio) {
                currentAudio.playbackRate = parseFloat(playbackRateRange.value);
            }
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        function closeModal() {
            modal.style.display = 'none';
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    var customMusicButton = document.createElement('button');
    customMusicButton.textContent = 'Custom Music 🎵';
    customMusicButton.style.position = 'fixed';
    customMusicButton.style.bottom = '10px';
    customMusicButton.style.right = '10px';
    customMusicButton.style.zIndex = '9999';
    customMusicButton.addEventListener('click', openModal);
    document.body.appendChild(customMusicButton);

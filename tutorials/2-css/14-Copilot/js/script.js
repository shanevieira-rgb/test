const video = document.getElementById('camera-video');
const fallback = document.getElementById('camera-fallback');
const status = document.getElementById('camera-status');
const captureBtn = document.getElementById('capture-btn');
const photosGrid = document.getElementById('photos');
const savedGrid = document.getElementById('saved-photos');
const savedCount = document.getElementById('saved-count');
const clearSavedBtn = document.getElementById('clear-saved');

const savedPhotos = new Map();

function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = () => video.play();
            status.textContent = 'Ready to snap your first memory.';
        })
        .catch(() => {
            status.textContent = 'Camera blocked or unavailable. Check your browser permissions.';
            video.hidden = true;
            fallback.hidden = false;
        });
}

function createPolaroidCard(id, imageUrl, label, options = {}) {
    const { saved = false, onSave } = options;
    const card = document.createElement('article');
    card.className = 'polaroid';
    card.tabIndex = 0;
    card.dataset.photoId = id;

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = label;

    const caption = document.createElement('p');
    caption.className = 'caption';
    caption.textContent = label;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const saveButton = document.createElement('button');
    saveButton.className = 'save';
    saveButton.textContent = saved ? 'Saved' : (savedPhotos.has(id) ? 'Saved' : 'Save');
    if (saved || savedPhotos.has(id)) {
        saveButton.classList.add('active');
    }

    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';

    actions.append(saveButton, viewButton);
    card.append(img, caption, actions);

    card.addEventListener('click', event => {
        if (event.target === saveButton || event.target === viewButton) return;
        card.classList.toggle('expanded');
    });

    saveButton.addEventListener('click', event => {
        event.stopPropagation();
        if (onSave) {
            onSave();
        } else {
            toggleSave(id, imageUrl, label, saveButton);
        }
    });

    viewButton.addEventListener('click', event => {
        event.stopPropagation();
        card.classList.toggle('expanded');
    });

    return card;
}

function addPhoto(imageUrl) {
    const id = `polaroid-${Date.now()}`;
    const label = `Captured ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const card = createPolaroidCard(id, imageUrl, label);
    photosGrid.prepend(card);
    status.textContent = 'Photo added to your wall. Save the ones you love!';
}

function toggleSave(id, imageUrl, label, button) {
    if (savedPhotos.has(id)) {
        savedPhotos.delete(id);
        button.textContent = 'Save';
        button.classList.remove('active');
    } else {
        savedPhotos.set(id, { imageUrl, label });
        button.textContent = 'Saved';
        button.classList.add('active');
    }
    renderSavedPhotos();
}

function renderSavedPhotos() {
    savedGrid.innerHTML = '';
    if (savedPhotos.size === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No saved polaroids yet. Capture and save the ones you love.';
        empty.style.color = '#d1c5f8';
        savedGrid.append(empty);
    } else {
        savedPhotos.forEach((photo, id) => {
            const card = createPolaroidCard(id, photo.imageUrl, photo.label, {
                saved: true,
                onSave: () => {
                    savedPhotos.delete(id);
                    renderSavedPhotos();
                    const originalButton = document.querySelector(`[data-photo-id="${id}"] .save`);
                    if (originalButton) {
                        originalButton.textContent = 'Save';
                        originalButton.classList.remove('active');
                    }
                }
            });
            savedGrid.append(card);
        });
    }
    savedCount.textContent = savedPhotos.size;
}

function capturePhoto() {
    if (video.srcObject == null) {
        status.textContent = 'No camera stream available to capture.';
        return;
    }
    const width = video.videoWidth;
    const height = video.videoHeight;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);
    const imageUrl = canvas.toDataURL('image/png');
    addPhoto(imageUrl);
}

captureBtn.addEventListener('click', capturePhoto);
clearSavedBtn.addEventListener('click', () => {
    savedPhotos.clear();
    renderSavedPhotos();
    document.querySelectorAll('.polaroid .save.active').forEach(button => {
        button.textContent = 'Save';
        button.classList.remove('active');
    });
});

startCamera();
renderSavedPhotos();

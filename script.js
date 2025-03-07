const imageUpload = document.getElementById('image-upload');
        const preview = document.getElementById('image-preview');
        const downloadBtn = document.getElementById('download-btn');

        // Handle image upload
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });

        // Handle download
        downloadBtn.addEventListener('click', async () => {
            try {
                const container = document.querySelector('.template-container');
                const canvas = await html2canvas(container, {
                    useCORS: true,
                    allowTaint: true,
                    scale: 2,
                    backgroundColor: null
                });
                
                const link = document.createElement('a');
                link.download = 'celebrate-west-africa.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (error) {
                console.error('Error generating image:', error);
            }
        });
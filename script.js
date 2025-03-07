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
                const preview = document.getElementById('image-preview');
        
                // Store original styles
                const originalContainerStyles = {
                    maxWidth: container.style.maxWidth,
                    width: container.style.width,
                    height: container.style.height,
                };
                const originalPreviewStyles = {
                    width: preview.style.width,
                    height: preview.style.height,
                    left: preview.style.left,
                    top: preview.style.top,
                };
        
                // Set container to original size (1080px)
                container.style.maxWidth = '1080px';
                container.style.width = '1080px';
                container.style.height = '1080px';
        
                // Reset preview to original size/position (desktop values)
                preview.style.width = '549px';
                preview.style.height = '549px';
                preview.style.left = '63%';
                preview.style.top = '45.8%';
        
                // Force reflow to apply styles
                container.offsetHeight; // This triggers a layout recalculation
        
                // Capture with high-resolution settings
                const canvas = await html2canvas(container, {
                    useCORS: true,
                    allowTaint: true,
                    scale: window.devicePixelRatio * 2, // Adjust scale dynamically
                    backgroundColor: null
                });
        
                // Restore original styles
                container.style.maxWidth = originalContainerStyles.maxWidth;
                container.style.width = originalContainerStyles.width;
                container.style.height = originalContainerStyles.height;
                preview.style.width = originalPreviewStyles.width;
                preview.style.height = originalPreviewStyles.height;
                preview.style.left = originalPreviewStyles.left;
                preview.style.top = originalPreviewStyles.top;
        
                // Download the image
                const link = document.createElement('a');
                link.download = 'celebrate-west-africa.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (error) {
                console.error('Error generating image:', error);
            }
        });
        
        // downloadBtn.addEventListener('click', async () => {
        //     try {
        //         const container = document.querySelector('.template-container');
        //         const canvas = await html2canvas(container, {
        //             useCORS: true,
        //             allowTaint: true,
        //             scale: 2,
        //             backgroundColor: null
        //         });
                
        //         const link = document.createElement('a');
        //         link.download = 'celebrate-west-africa.png';
        //         link.href = canvas.toDataURL('image/png');
        //         link.click();
        //     } catch (error) {
        //         console.error('Error generating image:', error);
        //     }
        // });
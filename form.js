/* 1.
function toggleMotherInfo() {
    
    var motherStatus = document.querySelector('input[name="motherStatus"]:checked');
    var motherInfo = document.getElementById('motherInfo');
    
    if (motherStatus.value === 'alive') {
        motherInfo.classList.remove('hidden');
    } else {
        motherInfo.classList.add('hidden');
    }
}
*/
/*
function toggleFatherInfo() {
    var fatherStatus = document.querySelector('input[name="fatherStatus"]:checked');
    var fatherInfo = document.getElementById('fatherInfo');
    
    if (fatherStatus.value === 'alive') {
        fatherInfo.classList.remove('hidden');
    } else {
        fatherInfo.classList.add('hidden');
    }
}
*/

/* 2.

function toggleCaregiverInfo() {
    var caregiverWorking = document.querySelector('input[name="caregiverWorking"]:checked');
    var caregiverInfo = document.getElementById('caregiverInfo');
    
    if (caregiverWorking.value === 'yes') {
        caregiverInfo.classList.remove('hidden');
    } else {
        caregiverInfo.classList.add('hidden');
    }
}


document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form elements
    const nameSurname = document.getElementById('NameSurname').value;
    const idNo = document.getElementById('IDNo').value;
    const motherName = document.getElementById('motherName')?.value;
    const motherIDNo = document.getElementById('motherIDNo')?.value;
    const fatherName = document.getElementById('fatherName')?.value;
    const fatherIDNo = document.getElementById('fatherIDNo')?.value;
    const caregiverIDNo = document.getElementById('caregiverIDNo')?.value;
    const caregiverPhone = document.getElementById('caregiverPhone')?.value;

    // Check if required fields are filled
    if (!nameSurname || !idNo || (document.getElementById('motherInfo') && (!motherName || !motherIDNo)) ||
        (document.getElementById('fatherInfo') && (!fatherName || !fatherIDNo)) ||
        (document.getElementById('caregiverInfo') && (!caregiverIDNo || !caregiverPhone))) {
        alert('Lütfen gerekli alanları (*) doldurunuz');
        return; // Stop form submission
    }

    // If everything is filled, submit the form
    document.getElementById('userForm').submit();
});

   

*/



document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        phone: document.getElementById('phone').value,
        NameSurname: document.getElementById('NameSurname').value,
        IDNo: document.getElementById('IDNo').value,
        sex: document.querySelector('input[name="title"]:checked') ? document.querySelector('input[name="title"]:checked').value : '',
        apply: document.getElementById('apply').value,
        address: document.getElementById('address').value,
        town: document.getElementById('town').value,
        neighbourhood: document.getElementById('neighbourhood').value,
        dateBirth: document.getElementById('dateBirth').value,
        motherName: document.getElementById('motherName').value,
        motherIDNo: document.getElementById('motherIDNo').value,
        motherAddress: document.getElementById('motherAddress').value,
        motherOccupation: document.getElementById('motherOccupation').value,
        motherOccupationType: document.querySelector('input[name="motherOccupationType"]:checked') ? document.querySelector('input[name="motherOccupationType"]:checked').value : '',
        motherPhone: document.getElementById('motherPhone').value,
        motherContactPhone: document.getElementById('motherContactPhone').value,
        motherWorkingHours: document.getElementById('motherWorkingHours').value,
        fatherName: document.getElementById('fatherName').value,
        fatherIDNo: document.getElementById('fatherIDNo').value,
        fatherAddress: document.getElementById('fatherAddress').value,
        fatherOccupation: document.getElementById('fatherOccupation').value,
        fatherOccupationType: document.querySelector('input[name="fatherOccupationType"]:checked') ? document.querySelector('input[name="fatherOccupationType"]:checked').value : '',
        fatherPhone: document.getElementById('fatherPhone').value,
        fatherContactPhone: document.getElementById('fatherContactPhone').value,
        fatherWorkingHours: document.getElementById('fatherWorkingHours').value,
        caregiverWorking: document.querySelector('input[name="caregiverWorking"]:checked') ? document.querySelector('input[name="caregiverWorking"]:checked').value : '',
        caregiverIDNo: document.getElementById('caregiverIDNo').value,
        caregiverPhone: document.getElementById('caregiverPhone').value,
        chronicDisease: document.getElementById('chronicDisease').value,
        allergies: document.getElementById('allergies').value,
        behavioralIssues: document.getElementById('behavioralIssues').value
    };

    // Send form data to the backend
    fetch('http://localhost:4000/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Redirect to success page
        window.location.href = 'success.html'; // Change 'success.html' to the actual path of your success page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form gönderimi başarısız oldu.'); // Alert message for submission failure
    });
});


/*
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        nameSurname: document.getElementById('NameSurname').value,
        IDNo: document.getElementById('IDNo').value,
        sex: document.querySelector('input[name="title"]:checked') ? document.querySelector('input[name="title"]:checked').value : '',
        apply: document.getElementById('apply').value,
        address: {
            street: document.getElementById('address').value,
            town: document.getElementById('town').value,
            neighbourhood: document.getElementById('neighbourhood').value
        },
        dateBirth: document.getElementById('dateBirth').value,
        mother: {
            name: document.getElementById('motherName').value,
            IDNo: document.getElementById('motherIDNo').value,
            address: {
                street: document.getElementById('motherAddress').value,
                town: document.getElementById('motherTown').value,
                neighbourhood: document.getElementById('motherNeighbourhood').value
            },
            occupation: {
                occupation: document.getElementById('motherOccupation').value,
                occupationType: document.querySelector('input[name="motherOccupationType"]:checked') ? document.querySelector('input[name="motherOccupationType"]:checked').value : '',
                workingHours: document.getElementById('motherWorkingHours').value
            },
            contact: {
                phone: document.getElementById('motherPhone').value,
                contactPhone: document.getElementById('motherContactPhone').value
            }
        },
        father: {
            name: document.getElementById('fatherName').value,
            IDNo: document.getElementById('fatherIDNo').value,
            address: {
                street: document.getElementById('fatherAddress').value,
                town: document.getElementById('fatherTown').value,
                neighbourhood: document.getElementById('fatherNeighbourhood').value
            },
            occupation: {
                occupation: document.getElementById('fatherOccupation').value,
                occupationType: document.querySelector('input[name="fatherOccupationType"]:checked') ? document.querySelector('input[name="fatherOccupationType"]:checked').value : '',
                workingHours: document.getElementById('fatherWorkingHours').value
            },
            contact: {
                phone: document.getElementById('fatherPhone').value,
                contactPhone: document.getElementById('fatherContactPhone').value
            }
        },
        caregiver: {
            working: document.querySelector('input[name="caregiverWorking"]:checked') ? document.querySelector('input[name="caregiverWorking"]:checked').value === 'yes' : false,
            IDNo: document.getElementById('caregiverIDNo').value,
            phone: document.getElementById('caregiverPhone').value
        },
        medicalInfo: {
            chronicDisease: document.getElementById('chronicDisease').value,
            allergies: document.getElementById('allergies').value,
            behavioralIssues: document.getElementById('behavioralIssues').value
        }
    };

    // Send form data to the backend
    fetch('http://localhost:7001/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.message === 'Form başarıyla gönderildi!') {
            window.location.href = 'success.html'; // Redirect to success page
        } else {
            alert(data.message); // Show the error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.');
    });
});


*/

function toggleCaregiverInfo() {
    var caregiverWorking = document.querySelector('input[name="caregiverWorking"]:checked');
    var caregiverInfo = document.getElementById('caregiverInfo');
    
    if (caregiverWorking && caregiverWorking.value === 'yes') {
        caregiverInfo.classList.remove('hidden');
    } else {
        caregiverInfo.classList.add('hidden');
    }
}

function toggleMotherInfo() {
    const alive = document.getElementById('AliveMother').checked;
    const natural = document.getElementById('NaturalMother').checked;
    const step = document.getElementById('StepMother').checked;

    if (natural && step) {
        alert('Öz ve Üvey aynı anda seçilemez.');
        document.getElementById('NaturalMother').checked = false;
        document.getElementById('StepMother').checked = false;
    }

    if (alive || natural || step) {
        document.getElementById('motherInfo').classList.remove('hidden');
    } else {
        document.getElementById('motherInfo').classList.add('hidden');
    }
}

function toggleFatherInfo() {
    const alive = document.getElementById('AliveFather').checked;
    const natural = document.getElementById('NaturalFather').checked;
    const step = document.getElementById('StepFather').checked;

    if (natural && step) {
        alert('Öz ve Üvey aynı anda seçilemez.');
        document.getElementById('NaturalFather').checked = false;
        document.getElementById('StepFather').checked = false;
    }

    if (alive || natural || step) {
        document.getElementById('fatherInfo').classList.remove('hidden');
    } else {
        document.getElementById('fatherInfo').classList.add('hidden');
    }
}

/*
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form elements
    const nameSurname = document.getElementById('NameSurname').value;
    const idNo = document.getElementById('IDNo').value;
    const motherName = document.getElementById('motherName')?.value;
    const motherIDNo = document.getElementById('motherIDNo')?.value;
    const fatherName = document.getElementById('fatherName')?.value;
    const fatherIDNo = document.getElementById('fatherIDNo')?.value;
    const caregiverIDNo = document.getElementById('caregiverIDNo')?.value;
    const caregiverPhone = document.getElementById('caregiverPhone')?.value;

    // Check if required fields are filled
    if (!nameSurname || !idNo || (document.getElementById('motherInfo') && (!motherName || !motherIDNo)) ||
        (document.getElementById('fatherInfo') && (!fatherName || !fatherIDNo)) ||
        (document.getElementById('caregiverInfo') && (!caregiverIDNo || !caregiverPhone))) {
        alert('Lütfen gerekli alanları (*) doldurunuz');
        return; // Stop form submission
    }

    const formData = {
        phone: document.getElementById('phone').value,
        NameSurname: document.getElementById('NameSurname').value,
        IDNo: document.getElementById('IDNo').value,
        sex: document.querySelector('input[name="title"]:checked') ? document.querySelector('input[name="title"]:checked').value : '',
        apply: document.getElementById('apply').value,
        address: document.getElementById('address').value,
        town: document.getElementById('town').value,
        neighbourhood: document.getElementById('neighbourhood').value,
        dateBirth: document.getElementById('dateBirth').value,
        motherName: document.getElementById('motherName').value,
        motherIDNo: document.getElementById('motherIDNo').value,
        motherAddress: document.getElementById('motherAddress').value,
        motherOccupation: document.getElementById('motherOccupation').value,
        motherOccupationType: document.querySelector('input[name="motherOccupationType"]:checked') ? document.querySelector('input[name="motherOccupationType"]:checked').value : '',
        motherPhone: document.getElementById('motherPhone').value,
        motherContactPhone: document.getElementById('motherContactPhone').value,
        motherWorkingHours: document.getElementById('motherWorkingHours').value,
        fatherName: document.getElementById('fatherName').value,
        fatherIDNo: document.getElementById('fatherIDNo').value,
        fatherAddress: document.getElementById('fatherAddress').value,
        fatherOccupation: document.getElementById('fatherOccupation').value,
        fatherOccupationType: document.querySelector('input[name="fatherOccupationType"]:checked') ? document.querySelector('input[name="fatherOccupationType"]:checked').value : '',
        fatherPhone: document.getElementById('fatherPhone').value,
        fatherContactPhone: document.getElementById('fatherContactPhone').value,
        fatherWorkingHours: document.getElementById('fatherWorkingHours').value,
        caregiverWorking: document.querySelector('input[name="caregiverWorking"]:checked') ? document.querySelector('input[name="caregiverWorking"]:checked').value : '',
        caregiverIDNo: document.getElementById('caregiverIDNo').value,
        caregiverPhone: document.getElementById('caregiverPhone').value,
        chronicDisease: document.getElementById('chronicDisease').value,
        allergies: document.getElementById('allergies').value,
        behavioralIssues: document.getElementById('behavioralIssues').value
    };

    
    // Send form data to the backend
    fetch('http://localhost:7001/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.message === 'Form başarıyla gönderildi!') {
            window.location.href = 'success.html'; // Redirect to success page
        } else {
            alert(data.message); // Show the error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.');
    });
});
*/

//önce ilçeyi sonra mahalleyi çıkarır

document.addEventListener('DOMContentLoaded', function() {
    const townSelect = document.getElementById('town');
    const neighbourhoodSelect = document.getElementById('neighbourhood');

    // Load JSON data
    fetch('formatted_mahalle.json')
        .then(response => response.json())
        .then(data => {
            // Populate town dropdown
            data.forEach(town => {
                const option = document.createElement('option');
                option.value = town.town;
                option.textContent = town.town;
                townSelect.appendChild(option);
            });

            // Handle town selection
            townSelect.addEventListener('change', function() {
                const selectedTown = townSelect.value;

                // Clear previous neighbourhood options
                neighbourhoodSelect.innerHTML = '<option value="">Select a neighbourhood</option>';

                if (selectedTown) {
                    const townData = data.find(town => town.town === selectedTown);
                    if (townData) {
                        // Populate neighbourhood dropdown
                        townData.neighbourhoods.forEach(neighbourhood => {
                            const option = document.createElement('option');
                            option.value = neighbourhood;
                            option.textContent = neighbourhood;
                            neighbourhoodSelect.appendChild(option);
                        });
                        neighbourhoodSelect.classList.remove('hidden');
                    }
                } else {
                    neighbourhoodSelect.classList.add('hidden');
                }
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
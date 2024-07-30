/*
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

function toggleCaregiverInfo() {
    var caregiverWorking = document.querySelector('input[name="caregiverWorking"]:checked');
    var caregiverInfo = document.getElementById('caregiverInfo');
    
    if (caregiverWorking.value === 'yes') {
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
 
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
  
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
    fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Optionally, handle success (e.g., show a success message to the user)
    })
    .catch(error => {
      console.error('Error:', error);
      // Optionally, handle error (e.g., show an error message to the user)
    });
  });
  
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

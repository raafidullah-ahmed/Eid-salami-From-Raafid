document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll to form when "Get Salami" clicked
  const giftBtn = document.querySelector('.gift_btn button');
  const formSection = document.querySelector('#form');

  // Smooth scroll to gift box when "Check Eligibility" clicked
  const eligibilityBtn = document.querySelector('.eligibility_div button');
  const giftBox = document.querySelector('.slmi_box');

  // Smooth scroll to footer when "About" button clicked
  const aboutBtn = document.querySelector('.about_btn');  // select the About button
  const footerSection = document.querySelector('footer'); // select the footer

  // Smooth scroll to Dua when closed box is clicked
  const closeBox = document.querySelector('.closeBox');
  const duaSection = document.querySelector('.dua');

  closeBox.addEventListener('click', () => {
    duaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  aboutBtn.addEventListener('click', () => {
    footerSection.scrollIntoView({ behavior: 'smooth' });
  });

  eligibilityBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Trigger the form submission logic manually (if needed)
    const form = document.querySelector('form');
    form.requestSubmit(); // This triggers your existing submit listener

    // Smooth scroll to gift box
    if (giftBox) {
      giftBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  giftBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default if inside form
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Optional: highlight the form for 2 seconds
  formSection.style.border = "2px solid #ffdf6b";
  setTimeout(() => { formSection.style.border = "none"; }, 2000);

  // Gender radios
  const femaleRadio = document.querySelector('#gen_f_in');
  const maleRadio = document.querySelector('#gen_m_in');

  // Relation inputs
  const friendOption = document.querySelector('input[value="friend"]');
  const closeFriendOption = document.querySelector('input[value="close_friend"]');
  const brotherOption = document.querySelector('input[value="brother"]');

  // Text spans
  const brotherText = brotherOption.nextElementSibling;

  // Parent container
  const relationDiv = document.querySelector('.rltn_div');

  // Warning message
  const warning = document.createElement("p");
  warning.innerText = "Only my future wife can be friend with me, don’t dare to select that 😌";
  warning.style.color = "#ff6b6b";
  warning.style.fontSize = "14px";
  warning.style.marginTop = "8px";

  // 👉 FEMALE SELECTED
  femaleRadio.addEventListener("change", () => {

    // Disable friend options
    friendOption.disabled = true;
    closeFriendOption.disabled = true;

    friendOption.parentElement.style.opacity = "0.4";
    closeFriendOption.parentElement.style.opacity = "0.4";

    // Add warning
    if (!relationDiv.contains(warning)) {
      relationDiv.appendChild(warning);
    }

    // Change brother → sister
    brotherText.innerText = "Sister (Respect++) 💫";
  });


  // 👉 MALE SELECTED (RESET)
  maleRadio.addEventListener("change", () => {

    // Enable options again
    friendOption.disabled = false;
    closeFriendOption.disabled = false;

    friendOption.parentElement.style.opacity = "1";
    closeFriendOption.parentElement.style.opacity = "1";

    // Remove warning
    if (relationDiv.contains(warning)) {
      relationDiv.removeChild(warning);
    }

    // Restore text
    brotherText.innerText = "Brother (Ussssss)";
  });


  // 🎁 FORM SUBMIT (DUA LOGIC)
  const form = document.querySelector("form");
  const duaText = document.querySelector(".dua");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedRel = document.querySelector('input[name="rel"]:checked');

    if (!selectedRel) return;

    let dua = "";

    if (selectedRel.value === "friend" || selectedRel.value === "close_friend") {
      dua = "May ALLAH bless you with a beautiful, pious spouse soon 😌💍 (don’t forget me at the wedding!)";
    }
    else if (selectedRel.value === "brother") {
      dua = "May ALLAH give you strength, success, and a righteous spouse 🤝 (bhabi loading... 😏)";
    }
    else {
      dua = "May ALLAH bless you with good health, happiness and prosperity. Eid Mubarak! 🌙";
    }

    // Add the small last line with reduced opacity
    const extraLine = '<br><span style="font-size:13px; opacity:0.95;">Eid Mubarak!</span><br><span style="font-size:11px; opacity:0.95;">[Dua is the best gift, so I chose the best gift as your Eidi]</span>';

    // Update the dua div
    duaText.innerHTML = dua + extraLine;
  });

});

// backend
const scriptURL = "https://script.google.com/macros/s/AKfycbzHyOArdGiQpuOu-BuTqreF9gIuQhxHbV9-HLS7OhbnCa1Hws-35unIAb2QD4TU8--lOQ/exec";

const eligibilityBtn = document.querySelector(".eligibility");
eligibilityBtn.onclick = () => {

  let name = document.getElementById("name").value;
  let gender = document.querySelector("input[name='gen']:checked")?.value;
  let relationship = document.querySelector("input[name='rel']:checked")?.value;
  let comment = document.getElementById("comment")?.value || "";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      gender: gender,
      relationship: relationship,
      comment: comment
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Saved:", data);
    })
    .catch(err => console.error(err));

  // your existing eligibility logic continues below
};

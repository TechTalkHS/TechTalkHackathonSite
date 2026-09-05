---
layout: post
title:  "Registration"
date:   2026-09-5 10:30:00
---
<form id="registration">
    <label>Name (first/last)</label><br>
    <input type="text" name="name" required><br><br>

    <label>Team Name (If you have no team put 'N/A')</label><br>
    <input type="text" name="team_name" required><br><br>

    <label>Team Members (If you have no team put 'N/A')</label><br>
    <input type="text" name="members" required><br><br>

    <label>Email</label><br>
    <input type="text" name="email" required><br><br>

    <label>Will you be able to come in-person on Monday, Spetember 21st?</label><br>
    <input type="radio" name="can_come" value="y" required>Yes
    <br>
    <input type="radio" name="can_come" value="n">No
    <br><br>

    <button type="submit">Submit</button>
</form>

<script>
    document.getElementById("registration").addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = e.target;
        const button = form.querySelector("button[type='submit']");
        const formData = new FormData(form);

        button.disabled = true;
        try {
            const response = await fetch("/.netlify/functions/notify_discord", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    team_name: formData.get("team_name"),
                    members: formData.get("members"),
                    email: formData.get("email"),
                    can_come: formData.get("can_come"),
                }),
            });

            if (!response.ok) {
                throw new Error("The registration could not be sent.");
            }

            form.reset();
            alert("Registration submitted!");
        } catch (error) {
            console.error(error);
            alert("We could not submit your registration. Please try again.");
        } finally {
            button.disabled = false;
        }
    });
</script>

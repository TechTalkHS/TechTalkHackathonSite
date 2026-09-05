---
layout: post
title:  "Registration"
date:   2026-09-5 10:30:00
---
<form name="registration" netlify>
  <label>Name (first/last)</label><br>
  <input type="text" name="name" required><br><br>

  <label>Team Name (If you have no team put 'N/A')</label><br>
  <input type="text" name="team_name" required><br><br>

  <label>Team Members (If you have no team put 'N/A')</label><br>
  <input type="text" name="members" required><br><br>

  <label>Email</label><br>
  <input type="text" name="email" required><br><br>

  <label>Will you be able to come in-person on Monday, Spetember 21st?</label><br>
  <input type="radio" name="can_come" value="y">Yes
  <br>
  <input type="radio" name="can_come" value="n">No
  <br><br>

  <button type="submit">Submit</button>
</form>

# Sign-up form that includes list of names and happy messages
Hi there 👋🏻 maybe you are a PX ambassador with an interest in front-end? Or maybe you want me to help you make something similar for you?
No matter the occasion, I can be rached at [krull@yfu.dk](mailto:krull@yfu.dk).

Love and kisses, Lea 💋

## Privacy note
This small app consists of an HTML form on the front-end which then sends all responses to a Google Sheet in the shared Google Drive folder of the PX2026 organizing team.

The full data set we receive consists of {`name`, `email`, `connection`, `country`, `message`, `visible: "yes || no"`}.

The backend is powered by a Google Apps Script, which makes sure all the data you submit automatically is entered into the data sheet,
but the script only returns {`name`, `country`, and `message`} of those rows, where the field `visible` is set to `yes`. Your other data is not stored in the browser and is in no way visible to the public. The title of the registrations page has a number ("_XX lovely people have signed up_"), which includes all entries, regardles of yes/no status.

The Google Drive folder for the organizing team of 2026 is hosted on my personal account, which _may_ have distributed hosting on servers outside the EU.

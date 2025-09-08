require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');



const { AppConfigurationClient } = require("@azure/app-configuration");
const { DefaultAzureCredential } = require("@azure/identity");

const app = express();
app.use(bodyParser.json());

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));


async function loadSecrets() {
    try {
        const endpoint = process.env.APPCONFIG_ENDPOINT;
        const credential = new DefaultAzureCredential();
        const client = new AppConfigurationClient(endpoint, credential);

        const Username = await client.getConfigurationSetting({ key: "app:login:Username" });
        const Email = await client.getConfigurationSetting({ key: "app:login:Email" });

        // Store in process.env so routes can use them
        process.env.LOGIN_USERNAME = Username.value;
        process.env.LOGIN_PASSWORD = Email.value;

        console.log("Secrets loaded from Key Vault via App Config ✅");
    } catch (err) {
        console.error("Error loading secrets:", err.message);
    }
}

loadSecrets();

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



const { response, request } = require("express");
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

const performAgeCounting = async (req = request, res = response) => {
  try {
    const response = await axios.get(
      "https://coderbyte.com/api/challenges/json/age-counting"
    );
      const data = response.data.data;
      // Extract the key values
      // Extract the key values
      const keyValuePairs = data.split(', ');
      const filteredItems = [];
      for (let i = 0; i < keyValuePairs.length; i++) {
        const [, age] = keyValuePairs[i].split('='); // Extract age value
        if(parseInt(age) === 32) filteredItems.push(keyValuePairs[i-1].split('=')[1]);
      }

    // Write key values to output.txt
    console.log(filteredItems);
    const output = filteredItems.join('\n') + '\n';
    await writeFile('output.txt', output);

    // Calculate SHA1 hash of the file
    const sha1hash = calculateSHA1(output);

    res.status(200).json({ sha1hash , filteredItems});
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function calculateSHA1(content) {
  const sha1sum = crypto.createHash('sha1');
  sha1sum.update(content);
  return sha1sum.digest('hex');
}

module.exports = {
  performAgeCounting,
};

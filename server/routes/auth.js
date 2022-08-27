const passport = require("passport");
const router = require("express").Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/google/callback", passport.authenticate('google', {failureRedirect: "/login"}), (req, res) => {
  res.redirect("/");
});

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


router.post('/login', async (req, res) => {
  const { authId } = req.body;

  try {
      const ticket = await client.verifyIdToken({
          idToken: authId,
          audience: process.env.CLIENT_ID
      });
      const payload = ticket.getPayload();
      let newUser = {
        googleId: payload.sub,
        displayName: payload.name,
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        image: payload.picture
      }
      // googleId: profile.id,
      //     displayName: profile.displayName,
      //     firstName: profile.name.givenName,
      //     lastName: profile.name.familyName,
      //     email: profile.emails[0].value,
      //     image: profile.photos[0].value,

      const loginToken = jwt.sign(`${JSON.stringify(newUser)}`, "secret key");
      let user = await User.findOne({ googleId: newUser.googleId });
      await User.findOneAndUpdate({email}, {name, picture}, {upsert: true});

      res.status(200).cookie('login', loginToken, { expire: 360000 + Date.now() }).send({
          success: true
      });
  }
  catch (e) {
      res.status(500).send({
          error: e
      });
  }
});

module.exports = router;
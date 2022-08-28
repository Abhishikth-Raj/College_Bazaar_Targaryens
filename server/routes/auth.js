const passport = require("passport");

module.exports = router => {
  router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  router.get("/auth/google/callback", passport.authenticate('google', {failureRedirect: "/login"}), (req, res) => {
    console.log(res.locals);
    res.redirect("/");
  });
  
  router.get('/auth/logout', (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })

  router.get("/api/current_user", (req, res) => {
    res.send(req.user);
  })
}
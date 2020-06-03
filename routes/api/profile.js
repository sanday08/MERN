const express = require("express");
const router = express.Router();

const passport = require("passport");
//Model import
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceFields = require("../../validation/experince");
const validateEducationFields = require("../../validation/education");
const isEmpty = require("../../validation/is-empty");
//@route  api/profile
//@desc   Display User Profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noProfile = "There is no Profile";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  }
);

//@route  api/profile/all
//@desc   Display all User Profile
//@access Private
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noProfiles = "There is no Profile";
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//@route  api/profile
//@desc   Create or Update User Profile
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    if (typeof req.body.skill !== "undefined")
      profileFields.skill = req.body.skill.split(",");
    profileFields.social = {};
    profileFields.social.youtube = !isEmpty(req.body.youtube)
      ? req.body.youtube
      : "";
    profileFields.social.instagram = !isEmpty(req.body.instagram)
      ? req.body.instagram
      : "";
    profileFields.social.twitter = !isEmpty(req.body.twitter)
      ? req.body.twitter
      : "";
    profileFields.social.linkedin = !isEmpty(req.body.linkedin)
      ? req.body.linkedin
      : "";
    profileFields.social.facebook = !isEmpty(req.body.facebook)
      ? req.body.facebook
      : "";
    console.log(profileFields);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      console.log(profileFields);
      if (profile) {
        //Update Profile
        Profile.findOneAndUpdate(
          { user: profile.user },
          { $set: profileFields },
          { new: true }
        ).exec();

        return res.json({ profile });
      } else {
        //create Profile

        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "Handle name allready available please change it.";
            return res.status(400).json(errors);
          }
          new Profile(profileFields)
            .save()
            .then((profile) => res.json({ profile }))
            .catch((err) => console.log(err));
        });
      }
    });
  }
);

//@route  api/profile/user/:user
//@desc   Display Profile info by User
//@access Private

router.get("/user/:user", (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.user })
    .then((profile) => {
      errors.noProfile = "Profile Not Found!";
      if (!profile) return res.status(404).json(errors);
      else return res.json(profile);
    })
    .catch((err) => {
      errors.noProfile = "Profile Not Found!";
      return res.json(errors);
    });
});

//@route  api/profile/handle/:handle
//@desc   Display Profile infor by Handle
//@access Private

router.get("/handle/:handle", (req, res) => {
  let errors = {};
  console.log("object");
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      errors.noProfile = "Profile Not Found!";
      if (!profile) return res.status(404).json(errors);
      else return res.json(profile);
    })
    .catch((err) => {
      errors.noProfile = "Profile Not Found!";
      return res.json(errors);
    });
});

//@route  api/profile/experice
//@desc  Add exeperinced
//@access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceFields(req.body);

    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const profileExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      console.log(profileExperience);
      profile.experience.unshift(profileExperience);
      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((err) => res.status(400).json(err));
    });
  }
);

//@route  api/profile/education
//@desc  Add education
//@access Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationFields(req.body);

    if (!isValid) return res.status(400).json(errors);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const profileEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.education.unshift(profileEducation);

      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((err) => res.status(421).json(err));
    });
  }
);

//@route  api/profile/experice/:exe_id
//@desc  Delete exeperinced
//@access Private
router.delete(
  "/experience/:exe_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        const expIndex = profile.experience
          .map((exe) => exe.id)
          .indexOf(req.params.exe_id);
        profile.experience.splice(expIndex, 1);
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.status(400).json(err));
      }
    });
  }
);

//@route  api/profile/education/:edu_id
//@desc  Add education
//@access Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        const eduIndex = profile.education
          .map((edu) => edu.id)
          .indexOf(req.params.edu_id);
        profile.education.splice(eduIndex, 1);
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.status(400).json(err));
      }
    });
  }
);

//@route  api/profile/
//@desc  Add education
//@access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findByIdAndRemove(req.user.id).then(() => {
        res.json({ sucssess: "sucssess" });
      });
    });
  }
);

module.exports = router;

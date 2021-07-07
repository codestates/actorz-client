export const userInfoInitState = {
  data: {
    userInfo: {
      id: null,
      mainPic: null,
      email: null,
      name: null,
      company: null,
      provider: null,
      gender: null,
      dob: null,
      password: null,
      careers: [
        {
          _id: null,
          title: null,
          year: null,
          type: null,
        },
      ],
      recruiter: {
        bAddress: {
          city: null,
          street: null,
          zipCode: null,
        },
        bEmail: null,
        bName: null,
        jobTitle: null,
        phoneNum: null,
      },
      role: "guest",
    },
  },
};

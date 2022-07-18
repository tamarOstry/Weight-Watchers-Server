const userService=require('./user');

describe('user test',()=>{
    test('get all',()=>{
        let users = userService.getAll().then(()=>{
            expect(JSON.parse(users)).toBe([
                {
                    "weight": {
                        "startWeight": 40.5,
                        "meetings": [
                            {
                                "Weight": 78.5,
                                "date": "2002-05-08",
                                "_id": "62d3edf9194a814e40cfb3bd"
                            }
                        ]
                    },
                    "_id": "62d08f249f381b7fca95f4c1",
                    "password": "12",
                    "firstName": "estyy",
                    "lastName": "tofik",
                    "address": {
                        "city": "jerusalem",
                        "street": "geula",
                        "number": 10,
                        "_id": "62d3c88438f04038ca1f3360"
                    },
                    "phone": "0504139123",
                    "email": "et@gmail.com",
                    "hight": 1.6,
                    "eatingDiary": [
                        {
                            "date": "2015-07-05T00:00:00.000Z",
                            "_id": "62d3c88438f04038ca1f3361"
                        },
                        {
                            "date": "2015-07-05T00:00:00.000Z",
                            "_id": "62d3c88438f04038ca1f3365"
                        },
                        {
                            "date": "2022-07-02T00:00:00.000Z",
                            "_id": "62d3c88438f04038ca1f3369"
                        },
                        {
                            "date": "2022-07-03T00:00:00.000Z",
                            "_id": "62d3c88438f04038ca1f336b"
                        }
                    ],
                    "updatedAt": "2022-07-17T11:09:53.863Z"
                },
                {
                    "weight": {
                        "startWeight": 73,
                        "meetings": [
                            {
                                "Weight": 55.6,
                                "date": "2002-05-08",
                                "_id": "62d3edee194a814e40cfb3b8"
                            },
                            {
                                "Weight": 55.6,
                                "date": "2002-05-08",
                                "_id": "62d3f05c4954a010516f35c0"
                            },
                            {
                                "Weight": 55.6,
                                "date": "2002-05-08",
                                "_id": "62d3f1924954a010516f35e6"
                            }
                        ]
                    },
                    "_id": "62d08f249f381b7fca95f4c2",
                    "password": "13",
                    "firstName": "yehuditi",
                    "lastName": "cohen",
                    "address": {
                        "city": "rechovot",
                        "street": "arimon",
                        "number": 110,
                        "_id": "62d3eded194a814e40cfb3b7"
                    },
                    "phone": "0558963214",
                    "email": "rk@gmail.com",
                    "hight": 1.75,
                    "eatingDiary": [],
                    "updatedAt": "2022-07-17T11:25:06.066Z"
                },
                {
                    "weight": {
                        "startWeight": 73,
                        "meetings": [
                            {
                                "Weight": 78.5,
                                "date": "2002-05-08",
                                "_id": "62d3f05a4954a010516f35a5"
                            },
                            {
                                "Weight": 79.5,
                                "date": "2002-05-08",
                                "_id": "62d3f1914954a010516f35ca"
                            }
                        ]
                    },
                    "_id": "62d08f249f381b7fca95f4c3",
                    "password": "56",
                    "firstName": "tova",
                    "lastName": "levi",
                    "address": {
                        "city": "jerusalem",
                        "street": "bait vagan",
                        "number": 50,
                        "_id": "62d3f0594954a010516f35a4"
                    },
                    "phone": "0536985214",
                    "email": "tl@gmail.com",
                    "hight": 1.64,
                    "eatingDiary": [
                        {
                            "date": "2015-07-05T00:00:00.000Z",
                            "_id": "62d3f05b4954a010516f35a8"
                        },
                        {
                            "date": "2015-07-05T00:00:00.000Z",
                            "_id": "62d3f05b4954a010516f35ac"
                        },
                        {
                            "date": "2022-06-29T00:00:00.000Z",
                            "_id": "62d3f05b4954a010516f35b0"
                        },
                        {
                            "date": "2022-06-30T00:00:00.000Z",
                            "_id": "62d3f05b4954a010516f35b4"
                        },
                        {
                            "date": "2022-06-29T00:00:00.000Z",
                            "_id": "62d3f05b4954a010516f35b6"
                        },
                        {
                            "date": "2022-07-29T00:00:00.000Z",
                            "_id": "62d3f05b4954a010516f35b8"
                        },
                        {
                            "date": "2022-07-02T00:00:00.000Z",
                            "_id": "62d3f05b4954a010516f35bb"
                        }
                    ],
                    "updatedAt": "2022-07-17T11:25:05.023Z"
                },
                {
                    "weight": {
                        "startWeight": 40.5,
                        "meeting": [
                            {
                                "Weight": 45.5,
                                "date": "2015-07-05"
                            },
                            {
                                "Weight": "44",
                                "date": "2022-07-13"
                            }
                        ],
                        "meetings": []
                    },
                    "_id": "62d08f249f381b7fca95f4c4",
                    "password": "89",
                    "firstName": "rachel",
                    "lastName": "fogel",
                    "address": {
                        "_id": "62d57335cd716c2b575054f4",
                        "city": "tel aviv",
                        "street": "arlozerov",
                        "number": 10
                    },
                    "phone": "058789654",
                    "email": "yuyuyuyu@gmail.com",
                    "hight": 1.6,
                    "eatingDiary": []
                },
                {
                    "weight": {
                        "startWeight": 40.5,
                        "meetings": []
                    },
                    "_id": "62d3cb944acfcf660557ebfb",
                    "password": "88",
                    "firstName": "ayala",
                    "lastName": "fridman",
                    "address": {
                        "city": "tel aviv",
                        "street": "arlozerov",
                        "number": 10,
                        "_id": "62d3cb944acfcf660557ebfc"
                    },
                    "phone": "058789654",
                    "email": "afridman@gmail.com",
                    "hight": 1.6,
                    "eatingDiary": [],
                    "createdAt": "2022-07-17T08:43:00.412Z",
                    "updatedAt": "2022-07-17T08:43:00.412Z",
                    "__v": 0
                }
            ])
        })
    })
})
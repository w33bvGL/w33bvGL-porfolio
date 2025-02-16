<html>
<head>
    <style>
        @font-face {
            font-family: 'Roboto';
            src: url('{{ asset('fonts/Roboto-Regular.ttf') }}') format('truetype');
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1080px;
            width: 1920px;
            overflow: hidden;
            background-color: #121212;
        }

        .container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
        }

        .triangle {
            position: absolute;
            left: 720px;
            width: 0;
            height: 0;
            border-right: 1200px solid #ffffff;
            border-bottom: 1080px solid transparent;
            border-top: 0 solid transparent;
        }

        .content {
            position: relative;
            top: 40%;
            left: 20%;
            transform: translateY(-50%);
            z-index: 2;
            color: black;
        }

        .left {
            /*background: pink;*/
            width: 60%;
            z-index: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .left h1 {
            color: white;
            font-size: 150px;
        }

        .left h2 {
            margin-top: 20px;
            color: white;
            font-size: 100px;
        }

        .right {
            /*background: blue;*/
            width: 40%;
            z-index: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        img {
            width: 700px;
            height: 700px;
            border-radius: 50%;
            border: 10px solid white;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="triangle"></div>

    <div class="left">
        <h1>{{ $name ?? 'vahesargsyan' }}</h1>
        <h2>{{ $role ?? 'Developer' }}</h2>
        <p>{{ $email ?? 'example@example.com' }}</p>
    </div>

    <div class="right">
        <img src="{{ $imageUrl ?? 'https://via.placeholder.com/300' }}" alt="Profile Image">
    </div>
</div>
</body>
</html>

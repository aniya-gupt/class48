var player, food, playerimg, bgimg, foodimage1, foodimage2, foodimage3, foodimage4, foodimage5, foodimage6
var chefimg, randx, randy, randimages, badfoodimage1, badfoodimage2, goodfoodGroup, badfoodGroup, badfood
var itemsCollected = 0
var health = 200
var maxHealth = 200
var invisibleGround
var borderleft, borderright, bordertop
var health = 200, maxHealth = 200
var left, right, jump

function preload() {
    bgimg = loadImage("bg.jpg")
    foodimage1 = loadImage("food .png")
    foodimage2 = loadImage("food 2.png")
    foodimage3 = loadImage("food 3.png")
    foodimage4 = loadImage("food 4.png")
    foodimage5 = loadImage("food 5.png")
    foodimage6 = loadImage("food 6.png")
    badfoodimage1 = loadImage("bad food 2.png")
    badfoodimage2 = loadImage("bad food.png")
    chefimg = loadImage("chef.png")

}




function setup() {
    createCanvas(windowWidth, windowHeight)

    chef = createSprite(width / 2, height - 270)
    chef.addImage(chefimg)
    chef.scale = 2.25

    invisibleGround = createSprite(width / 2, height - 25, width, 10)
    chef.collide(invisibleGround)
    invisibleGround.visible = false

    borderleft = createSprite(15, height / 2, 10, height)
    borderleft.visible = false
    borderright = createSprite(width - 15, height / 2, 10, height)
    borderright.visible = false
    bordertop = createSprite(width / 2, 25, width, 10)
    bordertop.visible = false


    // button to play the game

    right = createImg("right_button.png")
    right.position(width / 2-150 , height - 150)
    right.size(150, 150)
  

    jump = createImg("jump_button.png")
    jump.position(width / 2 , height - 150)
    jump.size(150, 150)


    left = createImg("left_button.png")
    left.position(width / 2 + 150, height - 150)
    left.size(150, 150)




    goodfoodGroup = new Group()
    badfoodGroup = new Group()


}



function draw() {
    background(bgimg)

    spawnFood()

    FoodIsToching()

    textSize(30)
    fill("red")
    stroke("black")
    strokeWeight(2)
    text("Items Collected: " + itemsCollected, 100, 50)
    border()
    movement()
    spawnBadFood()
    gamehealth()
    chef.collide(invisibleGround)



    if (itemsCollected >= 150) {
        gameOver()

    }



    if (health <= 0) {
        chef.remove()
        badfoodGroup.destroyEach()
        goodfoodGroup.destroyEach()
        gameOver()

    }




    drawSprites()
}





function spawnFood() {
    if (frameCount % 80 === 0) {
        randx = Math.round(random(width, width / 4))
        randy = Math.round(random(50, height - 150))
        food = createSprite(randx, randy)
        food.velocityX = -2

        randimages = Math.round(random(1, 6))

        switch (randimages) {

            case 1: food.addImage(foodimage1)
                break;

            case 2: food.addImage(foodimage2)
                break;

            case 3: food.addImage(foodimage3)
                break;

            case 4: food.addImage(foodimage4)
                break;

            case 5: food.addImage(foodimage5)
                break;

            case 6: food.addImage(foodimage6)
                break;

            default: break;

        }

        goodfoodGroup.add(food)



    }
}


function spawnBadFood() {
    if (frameCount % 150 === 0) {
        randx = Math.round(random(width, width / 4))
        randy = Math.round(random(50, height - 150))
        badfood = createSprite(randx, randy)
        badfood.velocityX = -2

        randimages = Math.round(random(1, 2))

        switch (randimages) {

            case 1: badfood.addImage(badfoodimage1)
                break;

            case 2: badfood.addImage(badfoodimage2)
                break;

            default: break;

        }

        badfoodGroup.add(badfood)



    }
}



function FoodIsToching() {

    if (chef.isTouching(goodfoodGroup)) {
        goodfoodGroup.destroyEach()
        itemsCollected += 1
    }

    if (chef.isTouching(badfoodGroup)) {
        badfoodGroup.destroyEach()
        health -= 10
    }

}

function movement() {

    jump.mousePressed(() => {
        chef.velocityY -= 5
    })
    chef.velocityY += 0.8



    // if (keyIsDown(UP_ARROW)) {
    //     chef.velocityY -= 5
    // }
    // chef.velocityY += 0.8

    right.mousePressed(() => {
        chef.velocityX += 5
    })

    
    // if (keyIsDown(RIGHT_ARROW)) {
    //     chef.velocityX += 5
    // }
    // chef.velocityX -= 0.8

    left.mousePressed(() => {
        chef.velocityX -= 5
    })
   


    // if (keyIsDown(LEFT_ARROW)) {
    //     chef.velocityX -= 5
    // }
    // chef.velocityX += 0.8

}



function border() {
    if (chef.isTouching(borderleft)) {
        chef.x = width / 2
        chef.y = height - 270

    }

    else if (chef.isTouching(borderright)) {
        chef.x = width / 2
        chef.y = height - 270

    }

    else if (chef.isTouching(bordertop)) {
        chef.x = width / 2
        chef.y = height - 270

    }





}

function gamehealth() {

    noFill()
    stroke("black")
    strokeWeight(2)
    rect(width - 250, 50, maxHealth, 15)

    fill("red")
    rect(width - 250, 50, health, 15)


}




function gameOver() {
    swal(
        {
            title: `Game Over!!!`,
            text: "Thanks for playing!!",
            imageUrl: "chef.png",
            imageSize: "150x150",
            confirmButtonText: "Play Again"
        },
        function (isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        }
    );
}







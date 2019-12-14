package guessinggame;

/*This program is a game that will have the user guess a number
* from 1-1000. They will have unlimited guesses.
* The program will tell the user how many tries it took to find the answer
*/

import java.util.Scanner;
import java.util.Random;

public class GuessingGame{
	
	//Method checks if user input is a valid number
	public static boolean isValid(String input){
		int num;
		try{
			num = Integer.parseInt(input);
		} catch(NumberFormatException e){
			System.err.println("Not a number. Try again!");
			return false;
		}
		
		if(num <= 0 || num >= 1001){
			System.err.println("Number is not in the range. Try again!");
			return false;
		}else 
			return true;
	}
	
	public static void main(String args[]){
	
		System.out.println("Welcome to Number Guess!\n");
		
		System.out.println("Objective: Guess a number from 1-1000.\n" +
							"(Don't worry you'll get unlimited tries.)\n");
							
		System.out.println("Let's get started!\n");

		Random rand = new Random();
		int number = rand.nextInt(1000);
		
		Scanner keyboard = new Scanner(System.in);
		
		int guess = -1, numOfAttempts = 0;
		while(guess != number){
			
			//Prints too low or too high to 
			//help the user guess the correct #
			if(numOfAttempts > 0){
				if(guess < number)
					System.out.println("Too low.\n");
				else
					System.out.println("Too high.\n");
			}
			
			System.out.println("Enter a number from 1-1000.");
			String input = keyboard.nextLine();
		
			//Loops until a valid number is entered
			while(isValid(input) == false){

				System.out.print("*********************************\n"+
				"Enter a number from 1-1000.\n");
				input = keyboard.nextLine();
			}
			
			guess = Integer.parseInt(input);

			numOfAttempts++;
		}
		
		System.out.println("\nYou did it! The answer was "+ number + ". Congratulations!");
		System.out.println("Number of guesses: " + numOfAttempts);
		
		System.out.println("Thank you for playing!");
		keyboard.close();
	}
}
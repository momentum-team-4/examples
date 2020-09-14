# Default filename
EMPLOYEE_RECORDS_FILENAME = "gross_pay.csv"


def calculate_pay(hours_worked, hourly_rate):
    """
    Calculate employee pay for a period where they worked <hours_worked> hours.

    parameters:
        hours_worked: the number of hours the employee worked in the pay period.
        hourly_rate: the employee's hourly rate.

    effects:
        none.

    results:
        returns: a floating point number, the employee's total pay after applying the time and a half rule.
    """
    regular = min(40, hours_worked)
    overtime = max(hours_worked - 40, 0)
    total_pay = regular * hourly_rate + overtime * hourly_rate * 1.5

    return total_pay


def read_employees(filename=EMPLOYEE_RECORDS_FILENAME):
    """
    Read a csv whose rows contain employee data and return a dict whose keys are the employee
    names and whose values are the employee data from that row.
    
    parameters:
        filename: a str, representing the name of the .csv file where employee data is located.
    
    effects:
        - interacts with the file named <filename>

    results:
        returns: a dict of employee records drawn from the given file.
    """

    employees = {}

    with open(filename, "rt") as infile:
        for line in infile:
            # Each line looks like John Doe,30,22.80\n
            employee, hours, rate = line.strip().split(',')
            employees[employee] = {"hours worked": float(hours), "hourly rate": float(rate)}

        return employees


def report_employee_pay(filename=EMPLOYEE_RECORDS_FILENAME):
    """ 
    Get a string with the pay period earnings for every employeee with a record in the file named <filename>. 
    """
    employees = read_employees(filename)

    output_string = ""

    for employee in employees:
        hours = employees[employee]["hours worked"]
        rate = employees[employee]["hourly rate"]
        output_string += f"Period pay for {employee}: {calculate_pay(hours, rate)}\n"

    return output_string


def update_employees(employees, filename=EMPLOYEE_RECORDS_FILENAME):
    """
    Update records in employees files, adding news records for those in employees that don't exist.
    """
    old_employees = read_employees(filename)


    for e in employees:
        # Update old entries if exists
        if e in old_employees:
            old_employees[e].update(employees[e])

        else:
            old_employees[e] = employees[e]

    with open(filename, "wt") as outfile:
        for e in old_employees:
            record = ",".join([e, str(old_employees[e]['hours worked']), str(old_employees[e]['hourly rate'])])
            outfile.write(record + "\n")

    return


def interactive(filename=EMPLOYEE_RECORDS_FILENAME):
    """
    Run a simple shell session. On exit, provides the option to save any records 
    created during the session.

    parameters:
        filename: a str, the name of the file where employee records should be saved.

    effects:
        - interacts with stdin and stdout.
        - the file with name <filename> is updated with the results of the session (if
          the user chooses to save).

    results:
        none. 
    """
    session = {}  # Dict to hold the values from this session (if the user wants to save them.)
    user_command = input("Enter an employee name or quit: ") # Get the first command

    # Interaction loop
    while user_command.lower() != 'quit':
        # Get the name, hours worked, and hourly rate for the employee
        employee_name = user_command

        while True:
            try:
                hours_worked = float(input("Enter hours worked: "))

            except ValueError as exc:
                print("Hours worked must be a valid floating point number.")

            else:
                break

        while True:
            try:
                hourly_rate = float(input("Enter hourly rate: "))

            except ValueError:
                print("Hourly rate must be a valid floating point number.")

            else:
                break

        # Save this user to the session dict
        session[employee_name] = {"hours worked": hours_worked, "hourly rate": hourly_rate}
        
        # Report the period pay for this employee
        print(f"Period pay for {employee_name}: ${calculate_pay(hours_worked, hourly_rate):,.2f}")

        # Continue the loop
        user_command = input("Enter an employee name or quit: ")

    # Prompt the user to save (interpret any answers other than 'y' and 'yes' as 'no')
    save = input("Save session (y/N): ")

    if save.lower() in {'y', 'yes'}:
        update_employees(session, filename)


def main(argv):
    """
    Read the command line arguments and dispatch the appropriate function.
    
    arguments:
        argv: a list of arguments passed from the command line.

    effects:
        - has the effects of the function interactive()
        - has the effects of the function report_employees()

    results:
        none.
    """
    command = argv[0]
    status = 0

    if command in {"-i", "--interactve"}:
        interactive()
        

    elif command in {"-r", "--report"}:
        employee_pay = report_employee_pay()
        print(employee_pay)

    else:
        print("Unknown command.")
        status = 1

    exit(status)


if __name__ == "__main__":
    import sys
    print(sys.argv)
    main(sys.argv[1:])

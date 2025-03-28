def calculate_credit_rating(data):
    risk_score = 0
    credit_score = []
    for mortgage in data:
        risk = 0
        ltv = mortgage["loan_amount"] / mortgage["property_value"] 
        if ltv > 0.9:
            risk += 2  
        elif ltv > 0.8:
            risk += 1 

        dti = mortgage["debt_amount"] / mortgage["annual_income"]
        if dti > 0.5:
            risk += 2 
        elif dti > 0.4:
            risk += 1

        if mortgage["credit_score"] >= 700:
            risk -= 1
        elif mortgage["credit_score"] < 650:
            risk += 1  

        if mortgage["loan_type"] == 'adjustable':
            risk += 1 
        elif mortgage["loan_type"] == 'fixed':
            risk -= 1  

        if mortgage["property_type"] == 'condo':
            risk += 1 

        risk_score += risk
        credit_score.append(mortgage["credit_score"])
        
    avg_credit_score = sum(credit_score) / len(credit_score)
    if avg_credit_score >= 700:
        risk_score -= 1  
    elif avg_credit_score < 650:
        risk_score += 1  

    if risk_score <= 2:
        return "AAA"  
    elif risk_score >= 3 and risk_score <= 5:
        return "BBB" 
    else:
        return "C"  

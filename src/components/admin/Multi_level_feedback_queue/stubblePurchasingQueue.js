export function calculateRecommendationScore(collaborators) {
    // Filter only Stubble Purchasing companies with Pending status
    const stubblePurchasingCompanies = collaborators.filter(
      (c) => c.collaborationType === "Stubble purchasing company" && c.status === "Pending",
    )
  
    // Calculate average price for each company
    const companiesWithAvgPrice = stubblePurchasingCompanies.map((company) => {
      const totalPrice = company.crops.reduce((sum, crop) => {
        return sum + (crop.priceRangeFrom + crop.priceRangeTo) / 2
      }, 0)
      const avgPrice = totalPrice / company.crops.length
      return { ...company, avgPrice }
    })
  
    // Sort companies by average price in descending order
    companiesWithAvgPrice.sort((a, b) => b.avgPrice - a.avgPrice)
  
    // Assign recommendation scores
    let recommendationScore = companiesWithAvgPrice.length
    return companiesWithAvgPrice.map((company) => ({
      ...company,
      recommendationScore: recommendationScore--,
    }))
  }
  
  export function getTopRecommendation(collaborators) {
    const scoredCompanies = calculateRecommendationScore(collaborators)
    return scoredCompanies.length > 0 ? scoredCompanies[0] : null
  }
  
  
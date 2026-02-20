// Dynamic Profile Links Manager
class ProfileLinksManager {
  constructor() {
    this.profiles = {
      leetcode: {
        username: "Akshayaa13",
        baseUrl: "https://leetcode.com/u/",
      },
      takeuforward: {
        username: "akshlearn13@gmail.com",
        baseUrl: "https://takeuforward.org/profile/",
      },
    };

    this.init();
  }

  init() {
    this.updateProfileLinks();
  }

  updateProfileLinks() {
    // Update LeetCode link
    const leetcodeLink = document.querySelector('a[href*="leetcode.com"]');
    if (leetcodeLink) {
      const url =
        this.profiles.leetcode.baseUrl + this.profiles.leetcode.username;
      leetcodeLink.href = url;
      leetcodeLink.setAttribute("data-profile-url", url);
    }

    // Update TakeUforward link
    const takeuLink = document.querySelector('a[href*="takeuforward.org"]');
    if (takeuLink) {
      const url =
        this.profiles.takeuforward.baseUrl +
        this.profiles.takeuforward.username;
      takeuLink.href = url;
      takeuLink.setAttribute("data-profile-url", url);
    }

    // Log for verification
    console.log("Profile Links Updated:", {
      leetcode:
        this.profiles.leetcode.baseUrl + this.profiles.leetcode.username,
      takeuforward:
        this.profiles.takeuforward.baseUrl +
        this.profiles.takeuforward.username,
    });
  }

  // Method to update profile dynamically if needed
  updateProfile(platform, username) {
    if (this.profiles[platform]) {
      this.profiles[platform].username = username;
      this.updateProfileLinks();
    }
  }

  // Method to get current profiles
  getProfiles() {
    return {
      leetcode:
        this.profiles.leetcode.baseUrl + this.profiles.leetcode.username,
      takeuforward:
        this.profiles.takeuforward.baseUrl +
        this.profiles.takeuforward.username,
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProfileLinksManager();
});
